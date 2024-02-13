"use client";

import Connect from "./Connect";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Connect />
      </div>
    </main>
  );
}
