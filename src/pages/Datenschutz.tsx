
const Datenschutz = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-white mb-8">Datenschutzerklärung</h1>
          
          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">1. Datenschutz auf einen Blick</h2>
              <h3 className="text-xl font-medium text-gray-300 mb-3">Allgemeine Hinweise</h3>
              <p className="text-gray-300 mb-4">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten 
                passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie 
                persönlich identifiziert werden können.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">2. Datenerfassung auf dieser Website</h2>
              <h3 className="text-xl font-medium text-gray-300 mb-3">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h3>
              <p className="text-gray-300 mb-4">
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten 
                können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
              </p>
              
              <h3 className="text-xl font-medium text-gray-300 mb-3">Wie erfassen wir Ihre Daten?</h3>
              <p className="text-gray-300 mb-4">
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um 
                Daten handeln, die Sie in ein Kontaktformular eingeben.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">3. Hosting</h2>
              <p className="text-gray-300 mb-4">
                Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
              </p>
              <p className="text-gray-300 mb-4">
                Die Erfassung und Verarbeitung Ihrer Daten erfolgt ausschließlich in Deutschland und unterliegt den 
                strengen deutschen Datenschutzgesetzen.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">4. Allgemeine Hinweise und Pflichtinformationen</h2>
              <h3 className="text-xl font-medium text-gray-300 mb-3">Datenschutz</h3>
              <p className="text-gray-300 mb-4">
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre 
                personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie 
                dieser Datenschutzerklärung.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">5. Datenerfassung auf dieser Website</h2>
              <h3 className="text-xl font-medium text-gray-300 mb-3">Kontaktformular</h3>
              <p className="text-gray-300 mb-4">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular 
                inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall 
                von Anschlussfragen bei uns gespeichert.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">6. Ihre Rechte</h2>
              <p className="text-gray-300 mb-4">
                Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer 
                gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung 
                oder Löschung dieser Daten zu verlangen.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">7. Kontakt</h2>
              <p className="text-gray-300 mb-4">
                Bei Fragen zum Datenschutz können Sie uns jederzeit unter den im Impressum angegebenen Kontaktdaten erreichen.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Datenschutz;
