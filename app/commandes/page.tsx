import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Filter, Plus, Search } from "lucide-react"

export default function CommandesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-semibold">
            <Link href="/">GestionCommandes</Link>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/" className="text-sm font-medium">
              Tableau de bord
            </Link>
            <Link href="/commandes" className="text-sm font-medium">
              Commandes
            </Link>
            <Link href="/commandes/nouvelle" className="text-sm font-medium">
              <Button size="sm">Nouvelle commande</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Commandes</h1>
              <p className="text-muted-foreground">Gérez toutes vos commandes</p>
            </div>
            <Link href="/commandes/nouvelle">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle commande
              </Button>
            </Link>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Filtres</CardTitle>
              <CardDescription>Filtrez les commandes selon vos critères</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Rechercher..." />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tous">Tous</SelectItem>
                      <SelectItem value="attente">En attente</SelectItem>
                      <SelectItem value="cours">En cours</SelectItem>
                      <SelectItem value="terminee">Terminée</SelectItem>
                      <SelectItem value="annulee">Annulée</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Trier par" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date-desc">Date (plus récente)</SelectItem>
                      <SelectItem value="date-asc">Date (plus ancienne)</SelectItem>
                      <SelectItem value="montant-desc">Montant (décroissant)</SelectItem>
                      <SelectItem value="montant-asc">Montant (croissant)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Liste des commandes</CardTitle>
              <CardDescription>Total: 152 commandes trouvées</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-sm font-medium">
                      <th className="pb-3">Référence</th>
                      <th className="pb-3">Client</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Montant</th>
                      <th className="pb-3">Statut</th>
                      <th className="pb-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3">CMD-2023-001</td>
                      <td className="py-3">Dupont Marie</td>
                      <td className="py-3">19/05/2025</td>
                      <td className="py-3">125 €</td>
                      <td className="py-3">
                        <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">En attente</span>
                      </td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <Link href="/commandes/CMD-2023-001">
                            <Button size="sm" variant="outline">
                              Voir
                            </Button>
                          </Link>
                          <Button size="sm" variant="outline">
                            Modifier
                          </Button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">CMD-2023-002</td>
                      <td className="py-3">Martin Thomas</td>
                      <td className="py-3">18/05/2025</td>
                      <td className="py-3">350 €</td>
                      <td className="py-3">
                        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">En cours</span>
                      </td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <Link href="/commandes/CMD-2023-002">
                            <Button size="sm" variant="outline">
                              Voir
                            </Button>
                          </Link>
                          <Button size="sm" variant="outline">
                            Modifier
                          </Button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">CMD-2023-003</td>
                      <td className="py-3">Petit Sophie</td>
                      <td className="py-3">17/05/2025</td>
                      <td className="py-3">75 €</td>
                      <td className="py-3">
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">Terminée</span>
                      </td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <Link href="/commandes/CMD-2023-003">
                            <Button size="sm" variant="outline">
                              Voir
                            </Button>
                          </Link>
                          <Button size="sm" variant="outline">
                            Modifier
                          </Button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">CMD-2023-004</td>
                      <td className="py-3">Dubois Jean</td>
                      <td className="py-3">16/05/2025</td>
                      <td className="py-3">210 €</td>
                      <td className="py-3">
                        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">En cours</span>
                      </td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <Link href="/commandes/CMD-2023-004">
                            <Button size="sm" variant="outline">
                              Voir
                            </Button>
                          </Link>
                          <Button size="sm" variant="outline">
                            Modifier
                          </Button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">CMD-2023-005</td>
                      <td className="py-3">Leroy Emma</td>
                      <td className="py-3">15/05/2025</td>
                      <td className="py-3">95 €</td>
                      <td className="py-3">
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">Terminée</span>
                      </td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <Link href="/commandes/CMD-2023-005">
                            <Button size="sm" variant="outline">
                              Voir
                            </Button>
                          </Link>
                          <Button size="sm" variant="outline">
                            Modifier
                          </Button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">CMD-2023-006</td>
                      <td className="py-3">Bernard Paul</td>
                      <td className="py-3">14/05/2025</td>
                      <td className="py-3">180 €</td>
                      <td className="py-3">
                        <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">En attente</span>
                      </td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <Link href="/commandes/CMD-2023-006">
                            <Button size="sm" variant="outline">
                              Voir
                            </Button>
                          </Link>
                          <Button size="sm" variant="outline">
                            Modifier
                          </Button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">CMD-2023-007</td>
                      <td className="py-3">Roux Claire</td>
                      <td className="py-3">13/05/2025</td>
                      <td className="py-3">145 €</td>
                      <td className="py-3">
                        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">En cours</span>
                      </td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <Link href="/commandes/CMD-2023-007">
                            <Button size="sm" variant="outline">
                              Voir
                            </Button>
                          </Link>
                          <Button size="sm" variant="outline">
                            Modifier
                          </Button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">CMD-2023-008</td>
                      <td className="py-3">Moreau Julie</td>
                      <td className="py-3">12/05/2025</td>
                      <td className="py-3">95 €</td>
                      <td className="py-3">
                        <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">En attente</span>
                      </td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <Link href="/commandes/CMD-2023-008">
                            <Button size="sm" variant="outline">
                              Voir
                            </Button>
                          </Link>
                          <Button size="sm" variant="outline">
                            Modifier
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Affichage de 1-8 sur 152 commandes</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Précédent
                  </Button>
                  <Button variant="outline" size="sm">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    Suivant
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
