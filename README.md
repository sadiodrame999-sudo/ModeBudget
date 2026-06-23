# ModeBudget

Boutique e-commerce statique avec panier local et paiement Stripe Checkout.

## Ce qui est inclus

- Pages catalogue par marque
- Panier local dans le navigateur
- Bouton de paiement sur la page panier
- Backend Express pour créer la session Stripe Checkout
- Pages de retour succès / annulation

## Installation

```bash
npm install
```

## Configuration

Copiez `.env.example` vers `.env` et remplacez la clé de test Stripe :

```bash
STRIPE_SECRET_KEY=sk_test_xxx
BASE_URL=http://localhost:4242
PORT=4242
```

## Lancement

```bash
npm start
```

Ouvrez ensuite :

```text
http://localhost:4242/index.html
```

## Ce qu'il manquera ensuite pour la mise en ligne

- Une vraie clé Stripe de test puis de production
- Un hébergement Node.js pour le backend
- Les webhooks Stripe pour confirmer les paiements côté serveur
- Les mentions légales, CGV et politique de remboursement
- La gestion du stock et des commandes en base de données
