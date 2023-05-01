import useSWR from "swr";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "./result.module.css";

const Result = () => {
  const router = useRouter();
  const { session_id } = router.query;
  const { data, error, isLoading } = useSWR(
    session_id ? `/api/checkout/${session_id}` : null,
    (url) =>
      axios
        .get(url)
        .then((res) => res.data)
        .catch((e) => console.log(e))
  );
  console.log(data, error);
  return (
    <section className={styles.body}>
      <div className={styles.card}>
        <h2 className={styles.title}>Payment Successful</h2>
        <h3 className="">Thank you for choosing ACloneB</h3>
      </div>
    </section>
  );
};

export default Result;
