import styles from "./styles/page.module.css";
import Auth from "./components/Temp/Auth/Auth";
import { authConfig } from "@/lib/Auth/auth";
import { getServerSession } from 'next-auth';

export default async function Home() {

	const session = await getServerSession(authConfig);

	return (
		<div className={styles.main}>
			<h1 className={styles.title}>Hello There!</h1>
			{!session ? <Auth /> : (
				<div>
					<p>You are signed in as {session.user?.email}</p>
					<p>Click <a href="/api/auth/signout">here</a> to sign out</p>

					<h2>Hello, {session.user?.name}</h2>
				</div>
			)}
		</div>
	);
}
