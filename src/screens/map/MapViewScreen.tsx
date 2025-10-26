import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from 'react-native';
import MapView, { Marker, Callout, Region, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Supercluster from 'supercluster';
import { colors, spacing } from '@/config/theme';
import { RootStackParamList } from '@/navigation/types';
import { Structure } from '@/models';
import * as Location from 'expo-location';

type MapViewScreenRouteProp = RouteProp<RootStackParamList, 'MapView'>;
type MapViewScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MapView'>;

interface ClusterMarker {
    id: string;
    geometry: {
        coordinates: [number, number];
    };
    properties: {
        cluster: boolean;
        point_count?: number;
        structure?: Structure;
    };
}

const INITIAL_REGION = {
    latitude: 46.603354,
    longitude: 1.888334,
    latitudeDelta: 10,
    longitudeDelta: 10,
};

export default function MapViewScreen() {
    const route = useRoute<MapViewScreenRouteProp>();
    const navigation = useNavigation<MapViewScreenNavigationProp>();
    const mapRef = useRef<MapView>(null);
    const superclusterRef = useRef<Supercluster | null>(null);

    const { structures = [] } = route.params || {};

    const [region, setRegion] = useState<Region>(INITIAL_REGION);
    const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [clusters, setClusters] = useState<ClusterMarker[]>([]);

    // Initialiser Supercluster
    useEffect(() => {
        if (structures.length === 0) return;

        const points = structures
            .filter((s: Structure) => s.address.latitude && s.address.longitude)
            .map((structure: Structure) => ({
                type: 'Feature' as const,
                geometry: {
                    type: 'Point' as const,
                    coordinates: [structure.address.longitude!, structure.address.latitude!],
                },
                properties: {
                    cluster: false,
                    structure,
                },
            }));

        const cluster = new Supercluster({
            radius: 60,
            maxZoom: 16,
        });

        cluster.load(points as any);
        superclusterRef.current = cluster;

        updateClusters();
    }, [structures]);

    // Demander la permission de localisation
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                const location = await Location.getCurrentPositionAsync({});
                setUserLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });

                // Centrer sur la position utilisateur
                if (structures.length === 0) {
                    setRegion({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.5,
                        longitudeDelta: 0.5,
                    });
                }
            }
        })();
    }, []);

    const updateClusters = () => {
        if (!superclusterRef.current) return;

        const bbox = [
            region.longitude - region.longitudeDelta / 2,
            region.latitude - region.latitudeDelta / 2,
            region.longitude + region.longitudeDelta / 2,
            region.latitude + region.latitudeDelta / 2,
        ] as [number, number, number, number];

        const zoom = Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2);

        const clusterData = superclusterRef.current.getClusters(bbox, zoom);

        setClusters(
            clusterData.map((feature: any, index) => ({
                id: `${feature.properties.cluster ? 'cluster' : 'point'}-${index}`,
                geometry: {
                    coordinates: feature.geometry.coordinates,
                },
                properties: feature.properties,
            }))
        );
    };

    const handleRegionChangeComplete = (newRegion: Region) => {
        setRegion(newRegion);
        updateClusters();
    };

    const handleClusterPress = (cluster: ClusterMarker) => {
        if (!superclusterRef.current || !cluster.properties.cluster) return;

        const expansionZoom = Math.min(
            superclusterRef.current.getClusterExpansionZoom(cluster.id as any),
            20
        );

        mapRef.current?.animateToRegion({
            latitude: cluster.geometry.coordinates[1],
            longitude: cluster.geometry.coordinates[0],
            latitudeDelta: region.latitudeDelta / Math.pow(2, expansionZoom - Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2)),
            longitudeDelta: region.longitudeDelta / Math.pow(2, expansionZoom - Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2)),
        });
    };

    const handleMarkerPress = (structure: Structure) => {
        navigation.navigate('StructureDetails', {
            structureId: structure.id,
            structure,
            searchResults: structures,
            initialIndex: structures.findIndex((s: Structure) => s.id === structure.id),
        });
    };

    const centerOnUserLocation = () => {
        if (userLocation) {
            mapRef.current?.animateToRegion({
                ...userLocation,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
            });
        }
    };

    const fitToMarkers = () => {
        if (structures.length === 0) return;

        const coordinates = structures
            .filter((s: Structure) => s.address.latitude && s.address.longitude)
            .map((s: Structure) => ({
                latitude: s.address.latitude!,
                longitude: s.address.longitude!,
            }));

        if (coordinates.length > 0) {
            mapRef.current?.fitToCoordinates(coordinates, {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true,
            });
        }
    };

    useEffect(() => {
        if (structures.length > 0) {
            // Petit délai pour laisser la carte se charger
            setTimeout(fitToMarkers, 500);
        }
    }, [structures]);

    return (
        <View style={styles.container}>
            {/* Header */}
            <SafeAreaView edges={['top']} style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
                        <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <View style={styles.headerLogo}>
                        <MaterialCommunityIcons name="wheelchair" size={20} color={colors.primary} />
                    </View>
                    <View style={styles.headerTitle}>
                        <Text style={styles.titleHandi}>HANDI</Text>
                        <Text style={styles.titleGo}>GO</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <Text style={styles.resultCount}>
                            {structures.length} structure{structures.length > 1 ? 's' : ''}
                        </Text>
                    </View>
                </View>
            </SafeAreaView>

            {/* Carte */}
            <MapView
                ref={mapRef}
                style={styles.map}
                provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
                initialRegion={region}
                onRegionChangeComplete={handleRegionChangeComplete}
                showsUserLocation={true}
                showsMyLocationButton={false}
                showsCompass={true}
                toolbarEnabled={false}
            >
                {clusters.map(cluster => {
                    const [longitude, latitude] = cluster.geometry.coordinates;

                    if (cluster.properties.cluster) {
                        // Cluster marker
                        return (
                            <Marker
                                key={cluster.id}
                                coordinate={{ latitude, longitude }}
                                onPress={() => handleClusterPress(cluster)}
                            >
                                <View style={styles.clusterMarker}>
                                    <Text style={styles.clusterText}>
                                        {cluster.properties.point_count}
                                    </Text>
                                </View>
                            </Marker>
                        );
                    }

                    // Structure marker
                    const structure = cluster.properties.structure!;
                    return (
                        <Marker
                            key={cluster.id}
                            coordinate={{ latitude, longitude }}
                            onPress={() => handleMarkerPress(structure)}
                        >
                            <View style={styles.structureMarker}>
                                <MaterialCommunityIcons
                                    name="map-marker"
                                    size={32}
                                    color={colors.primary}
                                />
                            </View>
                            <Callout tooltip>
                                <View style={styles.callout}>
                                    <Text style={styles.calloutTitle} numberOfLines={2}>
                                        {structure.name}
                                    </Text>
                                    <Text style={styles.calloutAddress} numberOfLines={1}>
                                        {structure.address.city}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.calloutButton}
                                        onPress={() => handleMarkerPress(structure)}
                                    >
                                        <Text style={styles.calloutButtonText}>Voir détails</Text>
                                        <MaterialCommunityIcons
                                            name="chevron-right"
                                            size={16}
                                            color="#FFFFFF"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </Callout>
                        </Marker>
                    );
                })}
            </MapView>

            {/* Boutons flottants */}
            <View style={styles.fabContainer}>
                <TouchableOpacity style={styles.fab} onPress={centerOnUserLocation}>
                    <MaterialCommunityIcons name="crosshairs-gps" size={24} color={colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.fab} onPress={fitToMarkers}>
                    <MaterialCommunityIcons name="fit-to-page-outline" size={24} color={colors.primary} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        backgroundColor: colors.primary,
        zIndex: 1,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        gap: spacing.sm,
    },
    headerButton: {
        padding: spacing.xs,
    },
    headerLogo: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: spacing.xs,
    },
    titleHandi: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        letterSpacing: 1,
    },
    titleGo: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.accent,
        letterSpacing: 1,
    },
    headerRight: {
        paddingHorizontal: spacing.sm,
    },
    resultCount: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    map: {
        flex: 1,
    },
    clusterMarker: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    clusterText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    structureMarker: {
        alignItems: 'center',
    },
    callout: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: spacing.md,
        width: 200,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    calloutTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: spacing.xs,
    },
    calloutAddress: {
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: spacing.sm,
    },
    calloutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: 8,
        gap: spacing.xs,
    },
    calloutButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
    fabContainer: {
        position: 'absolute',
        bottom: spacing.lg,
        right: spacing.lg,
        gap: spacing.sm,
    },
    fab: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});
