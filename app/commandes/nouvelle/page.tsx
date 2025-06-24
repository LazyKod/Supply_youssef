import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NouvelleCommandePage() {
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
            <h1 className="text-3xl font-bold">Nouvelle commande</h1>
            <p className="text-muted-foreground">Créez une nouvelle commande dans le système</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Informations de la commande</CardTitle>
              <CardDescription>Remplissez les détails de la nouvelle commande</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="reference">Référence</Label>
                    <Input id="reference" placeholder="Générée automatiquement" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" defaultValue="2025-05-19" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="client">Client</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un client" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dupont">Dupont Marie</SelectItem>
                      <SelectItem value="martin">Martin Thomas</SelectItem>
                      <SelectItem value="petit">Petit Sophie</SelectItem>
                      <SelectItem value="dubois">Dubois Jean</SelectItem>
                      <SelectItem value="leroy">Leroy Emma</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="statut">Statut</Label>
                  <Select defaultValue="attente" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="attente">En attente</SelectItem>
                      <SelectItem value="cours">En cours</SelectItem>
                      <SelectItem value="terminee">Terminée</SelectItem>
                      <SelectItem value="annulee">Annulée</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Produits</Label>
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-5">
                          <div className="md:col-span-2">
                            <Label htmlFor="produit1">Produit</Label>
                            <Select required>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner un produit" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="prod1">Ordinateur portable</SelectItem>
                                <SelectItem value="prod2">Smartphone</SelectItem>
                                <SelectItem value="prod3">Tablette</SelectItem>
                                <SelectItem value="prod4">Écran 24"</SelectItem>
                                <SelectItem value="prod5">Clavier sans fil</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="prix1">Prix unitaire</Label>
                            <Input id="prix1" type="number" placeholder="0.00" required />
                          </div>
                          <div>
                            <Label htmlFor="quantite1">Quantité</Label>
                            <Input id="quantite1" type="number" defaultValue="1" min="1" required />
                          </div>
                          <div>
                            <Label htmlFor="total1">Total</Label>
                            <Input id="total1" type="number" placeholder="0.00" disabled />
                          </div>
                        </div>
                        <Button type="button" variant="outline" size="sm">
                          + Ajouter un produit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="soustotal">Sous-total</Label>
                    <Input id="soustotal" type="number" placeholder="0.00" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tva">TVA (20%)</Label>
                    <Input id="tva" type="number" placeholder="0.00" disabled />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="total">Total</Label>
                  <Input id="total" type="number" placeholder="0.00" disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Informations supplémentaires sur la commande..." />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Annuler</Button>
              <Button>Enregistrer la commande</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
