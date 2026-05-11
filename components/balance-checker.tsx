"use client";

import { FormEvent, useMemo, useState } from "react";
import { ethers } from "ethers";

type LookupStatus = "idle" | "loading" | "success" | "error";

const EXAMPLE_ADDRESS = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

function formatBalance(value: bigint) {
  const eth = ethers.formatEther(value);
  const [whole, fraction = ""] = eth.split(".");
  const trimmedFraction = fraction.replace(/0+$/, "");

  if (!trimmedFraction) {
    return whole;
  }

  return `${whole}.${trimmedFraction.slice(0, 8)}`;
}

export function BalanceChecker() {
  const alchemyUrl = process.env.NEXT_PUBLIC_ALCHEMY_URL;
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<LookupStatus>("idle");

  const normalizedAddress = useMemo(() => address.trim(), [address]);
  const isLoading = status === "loading";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBalance(null);
    setError("");

    if (!normalizedAddress) {
      setStatus("error");
      setError("Enter an Ethereum wallet address.");
      return;
    }

    if (!ethers.isAddress(normalizedAddress)) {
      setStatus("error");
      setError("That does not look like a valid Ethereum address.");
      return;
    }

    if (!alchemyUrl) {
      setStatus("error");
      setError("Missing NEXT_PUBLIC_ALCHEMY_URL. Add it to .env.local and restart the dev server.");
      return;
    }

    setStatus("loading");

    try {
      const provider = new ethers.JsonRpcProvider(alchemyUrl);
      const weiBalance = await provider.getBalance(normalizedAddress);
      setBalance(formatBalance(weiBalance));
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Could not fetch the balance. Check the RPC URL and try again.");
    }
  }

  return (
    <section className="checker" aria-label="Wallet balance checker">
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="wallet-address">Wallet address</label>
        <div className="input-row">
          <input
            id="wallet-address"
            name="wallet-address"
            type="text"
            inputMode="text"
            autoComplete="off"
            spellCheck={false}
            placeholder={EXAMPLE_ADDRESS}
            value={address}
            onChange={(event) => {
              setAddress(event.target.value);
              if (status !== "loading") {
                setError("");
                setBalance(null);
                setStatus("idle");
              }
            }}
            disabled={isLoading}
            aria-invalid={status === "error"}
            aria-describedby={error ? "lookup-error" : undefined}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Checking" : "Check"}
          </button>
        </div>
      </form>

      <div className="result" aria-live="polite">
        {status === "idle" && (
          <p className="muted">Try the example address or paste any Ethereum mainnet wallet.</p>
        )}
        {isLoading && <p className="muted">Fetching balance...</p>}
        {error && (
          <p id="lookup-error" className="error">
            {error}
          </p>
        )}
        {balance && (
          <div className="balance">
            <span>ETH balance</span>
            <strong>{balance} ETH</strong>
            <p>Balance fetched from Ethereum Mainnet via Alchemy.</p>
          </div>
        )}
      </div>
    </section>
  );
}
