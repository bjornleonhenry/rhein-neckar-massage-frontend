
const AGB = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-white mb-8">Allgemeine Geschäftsbedingungen</h1>
          
          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">§ 1 Geltungsbereich</h2>
              <p className="text-gray-300 mb-4">
                Diese Allgemeinen Geschäftsbedingungen gelten für alle Dienstleistungen, die über diese Website 
                angeboten werden. Mit der Nutzung unserer Dienstleistungen erkennen Sie diese AGB als verbindlich an.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">§ 2 Vertragspartner</h2>
              <p className="text-gray-300 mb-4">
                Vertragspartner für alle über diese Website angebotenen Dienstleistungen ist:
              </p>
              <div className="text-gray-300 space-y-2 ml-4">
                <p>Max Mustermann</p>
                <p>Musterstraße 123</p>
                <p>12345 Musterstadt</p>
                <p>Deutschland</p>
                <p>E-Mail: info@example.com</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">§ 3 Leistungen</h2>
              <p className="text-gray-300 mb-4">
                Wir bieten Wellness- und Entspannungsdienstleistungen an. Alle angebotenen Dienstleistungen 
                erfolgen ausschließlich zu Wellness- und Entspannungszwecken.
              </p>
              <p className="text-gray-300 mb-4">
                Die konkreten Leistungen ergeben sich aus der jeweiligen Beschreibung auf unserer Website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">§ 4 Vertragsschluss</h2>
              <p className="text-gray-300 mb-4">
                Ein Vertrag kommt durch die Annahme unseres Angebots durch den Kunden zustande. Die Annahme 
                kann schriftlich, mündlich oder durch konkludentes Handeln erfolgen.
              </p>
              <p className="text-gray-300 mb-4">
                Wir behalten uns das Recht vor, Angebote ohne Angabe von Gründen abzulehnen.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">§ 5 Preise und Zahlung</h2>
              <p className="text-gray-300 mb-4">
                Die Preise ergeben sich aus der jeweiligen Leistungsbeschreibung. Alle Preise verstehen sich 
                inklusive der gesetzlichen Mehrwertsteuer.
              </p>
              <p className="text-gray-300 mb-4">
                Die Zahlung erfolgt in der Regel vor Erbringung der Leistung. Wir akzeptieren Barzahlung 
                und andere nach Absprache vereinbarte Zahlungsarten.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">§ 6 Termine und Stornierung</h2>
              <p className="text-gray-300 mb-4">
                Termine sind verbindlich. Bei Nichterscheinen oder verspäteter Stornierung (weniger als 24 Stunden 
                vor dem Termin) behalten wir uns vor, eine Ausfallgebühr in Höhe von 50% des vereinbarten Preises 
                zu berechnen.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">§ 7 Haftung</h2>
              <p className="text-gray-300 mb-4">
                Wir haften nur für Vorsatz und grobe Fahrlässigkeit, soweit nicht zwingende gesetzliche 
                Haftungsbestimmungen entgegenstehen.
              </p>
              <p className="text-gray-300 mb-4">
                Die Haftung für leichte Fahrlässigkeit ist ausgeschlossen, es sei denn, es werden wesentliche 
                Vertragspflichten verletzt.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">§ 8 Datenschutz</h2>
              <p className="text-gray-300 mb-4">
                Der Schutz Ihrer persönlichen Daten ist uns wichtig. Informationen zum Umgang mit Ihren Daten 
                finden Sie in unserer Datenschutzerklärung.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">§ 9 Schlussbestimmungen</h2>
              <p className="text-gray-300 mb-4">
                Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit 
                der übrigen Bestimmungen unberührt.
              </p>
              <p className="text-gray-300 mb-4">
                Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts.
              </p>
              <p className="text-gray-300 mb-4">
                Gerichtsstand ist unser Geschäftssitz, sofern der Kunde Kaufmann, juristische Person des 
                öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">§ 10 Kontakt</h2>
              <p className="text-gray-300 mb-4">
                Bei Fragen zu diesen AGB können Sie uns jederzeit unter den im Impressum angegebenen 
                Kontaktdaten erreichen.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AGB;
