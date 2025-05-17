import Footer from './Footer';
import GestorNavbar from './GestorNavbar';

export default function GestorLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <GestorNavbar />
            <main className="flex-grow px-8">
                {children}
            </main>
            <Footer />
        </div>
    );
} 