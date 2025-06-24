import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { ArrowLeft, Download, Pencil, Printer } from "lucide-react"

export default function CommandeDetailPage({ params }) {
  // Dans un cas réel, vous récupéreriez les données de la commande à partir de l'ID
  const commandeId = params.id

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
          <div className="mb-8">
            <Link
              href="/commandes"
              className="mb-4 flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux commandes
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Commande {commandeId}</h1>
                <p className="text-muted-foreground">Détails de la commande et suivi</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Printer className="mr-2 h-4 w-4" />
                  Imprimer
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Exporter
                </Button>
                <Button size="sm">
                  <Pencil className="mr-2 h-4 w-4" />
                  Modifier
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  <dt className="font-medium">Référence:</dt>
                  <dd>{commandeId}</dd>
                  <dt className="font-medium">Date:</dt>
                  <dd>19/05/2025</dd>
                  <dt className="font-medium">Statut:</dt>
                  <dd>
                    <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">En attente</span>
                  </dd>
                  <dt className="font-medium">Total:</dt>
                  <dd className="font-bold">125 €</dd>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Client</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  <dt className="font-medium">Nom:</dt>
                  <dd>Dupont Marie</dd>
                  <dt className="font-medium">Email:</dt>
                  <dd>marie.dupont@example.com</dd>
                  <dt className="font-medium">Téléphone:</dt>
                  <dd>06 12 34 56 78</dd>
                  <dt className="font-medium">Client depuis:</dt>
                  <dd>10/01/2023</dd>
                </dl>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">
                  Voir le profil client
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Livraison</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  <dt className="font-medium">Adresse:</dt>
                  <dd>123 Rue de Paris</dd>
                  <dt className="font-medium">Ville:</dt>
                  <dd>Lyon</dd>
                  <dt className="font-medium">Code postal:</dt>
                  <dd>69000</dd>
                  <dt className="font-medium">Pays:</dt>
                  <dd>France</dd>
                </dl>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Produits commandés</CardTitle>
              <CardDescription>Liste des articles de la commande</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produit</TableHead>
                    <TableHead>Prix unitaire</TableHead>
                    <TableHead>Quantité</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Clavier sans fil</TableCell>
                    <TableCell>45 €</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell className="text-right">45 €</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Souris optique</TableCell>
                    <TableCell>25 €</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell className="text-right">50 €</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Support pour ordinateur portable</TableCell>
                    <TableCell>30 €</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell className="text-right">30 €</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-end">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Sous-total:</span>
                    <span>125 €</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>TVA (0%):</span>
                    <span>0 €</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-bold">
                    <span>Total:</span>
                    <span>125 €</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Historique</CardTitle>
              <CardDescription>Suivi des modifications et des statuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Commande créée</p>
                    <p className="text-sm text-muted-foreground">19/05/2025 à 10:23 par Admin</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700">
                    2
                  </div>
                  <div>
                    <p className="font-medium">En attente de paiement</p>
                    <p className="text-sm text-muted-foreground">19/05/2025 à 10:23 par Système</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full">
                <Button className="w-full">Changer le statut</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
