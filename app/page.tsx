import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { BarChart3, Package, ShoppingCart, TrendingUp } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-semibold">
            <ShoppingCart className="h-5 w-5" />
            <span>GestionCommandes</span>
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Tableau de bord</h1>
            <p className="text-muted-foreground">Aperçu de vos commandes et statistiques</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total des commandes</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">152</div>
                <p className="text-xs text-muted-foreground">+12% par rapport au mois dernier</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Commandes en attente</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">4 nouvelles aujourd'hui</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Commandes en cours</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">38</div>
                <p className="text-xs text-muted-foreground">6 expédiées aujourd'hui</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Chiffre d'affaires</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">9 850 €</div>
                <p className="text-xs text-muted-foreground">+8% par rapport au mois dernier</p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8">
            <Tabs defaultValue="recentes">
              <TabsList>
                <TabsTrigger value="recentes">Commandes récentes</TabsTrigger>
                <TabsTrigger value="attente">En attente</TabsTrigger>
                <TabsTrigger value="cours">En cours</TabsTrigger>
              </TabsList>
              <TabsContent value="recentes" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Commandes récentes</CardTitle>
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
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-3">CMD-2023-001</td>
                            <td className="py-3">Dupont Marie</td>
                            <td className="py-3">19/05/2025</td>
                            <td className="py-3">125 €</td>
                            <td className="py-3">
                              <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                                En attente
                              </span>
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
                          </tr>
                          <tr className="border-b">
                            <td className="py-3">CMD-2023-003</td>
                            <td className="py-3">Petit Sophie</td>
                            <td className="py-3">17/05/2025</td>
                            <td className="py-3">75 €</td>
                            <td className="py-3">
                              <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                                Terminée
                              </span>
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
                          </tr>
                          <tr>
                            <td className="py-3">CMD-2023-005</td>
                            <td className="py-3">Leroy Emma</td>
                            <td className="py-3">15/05/2025</td>
                            <td className="py-3">95 €</td>
                            <td className="py-3">
                              <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                                Terminée
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Link href="/commandes">
                        <Button variant="outline" size="sm">
                          Voir toutes les commandes
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="attente" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Commandes en attente</CardTitle>
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
                              <Button size="sm" variant="outline">
                                Traiter
                              </Button>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3">CMD-2023-006</td>
                            <td className="py-3">Bernard Paul</td>
                            <td className="py-3">14/05/2025</td>
                            <td className="py-3">180 €</td>
                            <td className="py-3">
                              <Button size="sm" variant="outline">
                                Traiter
                              </Button>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3">CMD-2023-008</td>
                            <td className="py-3">Moreau Julie</td>
                            <td className="py-3">12/05/2025</td>
                            <td className="py-3">95 €</td>
                            <td className="py-3">
                              <Button size="sm" variant="outline">
                                Traiter
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="cours" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Commandes en cours</CardTitle>
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
                            <th className="pb-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-3">CMD-2023-002</td>
                            <td className="py-3">Martin Thomas</td>
                            <td className="py-3">18/05/2025</td>
                            <td className="py-3">350 €</td>
                            <td className="py-3">
                              <Button size="sm" variant="outline">
                                Terminer
                              </Button>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3">CMD-2023-004</td>
                            <td className="py-3">Dubois Jean</td>
                            <td className="py-3">16/05/2025</td>
                            <td className="py-3">210 €</td>
                            <td className="py-3">
                              <Button size="sm" variant="outline">
                                Terminer
                              </Button>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3">CMD-2023-007</td>
                            <td className="py-3">Roux Claire</td>
                            <td className="py-3">13/05/2025</td>
                            <td className="py-3">145 €</td>
                            <td className="py-3">
                              <Button size="sm" variant="outline">
                                Terminer
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
