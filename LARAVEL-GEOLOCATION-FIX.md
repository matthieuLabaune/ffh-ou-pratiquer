# Correction du contrôleur Laravel pour la géolocalisation

Le problème SQL vient du fait que les colonnes `latitude` et `longitude` ne sont pas dans la table `affiliation_entries` mais dans la table `addresses` liée aux structures.

Voici la correction à apporter dans votre contrôleur Laravel `OuPratiquerMobileApiController.php` :

```php
public function search(Request $request): AnonymousResourceCollection
{
    // Recherche et filtres principaux
    $builder = Affiliation::query()
        ->where('season', date('Y'))
        ->with(['disciplines', 'mobilities', 'structure', 'structure.address']);

    // Recherche par nom, discipline, ville
    if ($request->filled('q')) {
        $q = $request->input('q');
        $builder->where(function ($sub) use ($q): void {
            $sub->whereHas('structure', function ($sq) use ($q): void {
                $sq->where('name', 'like', "%{$q}%")
                    ->orWhereHas('address', function ($sq) use ($q): void {
                        $sq->where('city', 'like', "%{$q}%");
                    });
            })
                ->orWhereHas('disciplines', fn ($sq) => $sq->where('name', 'like', "%{$q}%"));
        });
    }

    // Filtres
    if ($request->filled('discipline')) {
        $builder->whereHas('disciplines', fn ($q) => $q->where('name', $request->input('discipline')));
    }

    if ($request->filled('region')) {
        $builder->whereHas('structure', fn ($q) => $q->where('region_id', $request->input('region')));
    }

    if ($request->filled('departement')) {
        $builder->whereHas('structure', function ($q) use ($request): void {
            $q->where('department_id', $request->input('departement'));
        });
    }

    if ($request->filled('type')) {
        $builder->whereHas('structure', function ($q) use ($request): void {
            $q->where('type', $request->input('type'));
        });
    }

    // CORRECTION : Recherche géolocalisée avec les bonnes tables
    if ($request->filled('lat') && $request->filled('lng') && $request->filled('radius')) {
        $lat = $request->float('lat');
        $lng = $request->float('lng');
        $radius = $request->float('radius');

        // Utiliser la table addresses via la relation structure
        $builder->whereHas('structure.address', function ($q) use ($lat, $lng, $radius) {
            $haversine = "(6371 * acos(cos(radians({$lat})) * cos(radians(addresses.latitude)) * cos(radians(addresses.longitude) - radians({$lng})) + sin(radians({$lat})) * sin(radians(addresses.latitude))))";
            $q->selectRaw("*, {$haversine} AS distance")
              ->havingRaw("{$haversine} <= ?", [$radius]);
        });
    }

    $affiliations = $builder->get();

    return OuPratiquerMobileResource::collection($affiliations);
}
```

## Alternative plus simple (recommandée)

Si la structure des tables ne permet pas cette approche complexe, vous pouvez désactiver temporairement la recherche géolocalisée et utiliser seulement les autres filtres :

```php
// Recherche géolocalisée (temporairement désactivée)
if ($request->filled('lat') && $request->filled('lng') && $request->filled('radius')) {
    // TODO: Implémenter la recherche géolocalisée
    // Pour l'instant, on ignore ces paramètres
    \Log::info('Recherche géolocalisée demandée mais non implémentée', [
        'lat' => $request->input('lat'),
        'lng' => $request->input('lng'),
        'radius' => $request->input('radius')
    ]);
}
```

## Structure de base de données recommandée

Pour que la géolocalisation fonctionne correctement, assurez-vous que :

1. La table `addresses` a les colonnes `latitude` et `longitude` (DECIMAL(10,8) et DECIMAL(11,8))
2. Les relations sont bien définies : `Affiliation -> Structure -> Address`
3. Les index sont créés sur les colonnes de géolocalisation pour les performances
