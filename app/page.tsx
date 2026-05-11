import { BalanceChecker } from "@/components/balance-checker";

export default function Home() {
  return (
    <main className="shell">
      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">Ethereum mainnet balance checker</p>
        <h1 id="page-title">Where my ETH at?</h1>
        <p className="lede">Mainnet balances, straight from Alchemy.</p>
      </section>

      <BalanceChecker />
    </main>
  );
}
