
const Impressum = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-white mb-8">Impressum</h1>
          
          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">Angaben gemäß § 5 TMG</h2>
              <div className="text-gray-300 space-y-2">
                <p><strong>Betreiber der Website:</strong></p>
                <p>Max Mustermann</p>
                <p>Musterstraße 123</p>
                <p>12345 Musterstadt</p>
                <p>Deutschland</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">Kontakt</h2>
              <div className="text-gray-300 space-y-2">
                <p><strong>Telefon:</strong> +49 (0) 123 456789</p>
                <p><strong>E-Mail:</strong> info@example.com</p>
                <p><strong>Website:</strong> www.example.com</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">Umsatzsteuer-ID</h2>
              <p className="text-gray-300">
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
              </p>
              <p className="text-gray-300">DE123456789</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
              <div className="text-gray-300 space-y-2">
                <p>Max Mustermann</p>
                <p>Musterstraße 123</p>
                <p>12345 Musterstadt</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">EU-Streitschlichtung</h2>
              <p className="text-gray-300 mb-4">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                <a href="https://ec.europa.eu/consumers/odr/" className="text-rose-400 hover:text-rose-300 underline ml-1">
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p className="text-gray-300">
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
              <p className="text-gray-300 mb-4">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">Haftung für Inhalte</h2>
              <p className="text-gray-300 mb-4">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den 
                allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht 
                unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach 
                Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">Haftung für Links</h2>
              <p className="text-gray-300 mb-4">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
                Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der 
                verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">Urheberrecht</h2>
              <p className="text-gray-300 mb-4">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen 
                Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der 
                Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impressum;
