import Footer from './Footer';
import UserNavbar from './UserNavbar';

export default function UserLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <UserNavbar />
            <main className="flex-grow px-8">
                {children}
            </main>
            <Footer />
        </div>
    );
} 