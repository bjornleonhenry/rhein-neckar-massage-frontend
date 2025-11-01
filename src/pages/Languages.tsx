import { useState } from 'react';
import { motion } from 'motion/react';
import { Save, Edit2, Globe, Check, X, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardHover } from '@/components/ui/card-hover';
import { useTranslation } from '@/hooks/useTranslation';

interface LanguageString {
  key: string;
  german: string;
  english: string;
  category: string;
}

const Languages = () => {
  const { refreshTranslations } = useTranslation();
  const [languageStrings, setLanguageStrings] = useState<LanguageString[]>([
    // Header Navigation
    { key: 'nav.home', german: 'Home', english: 'Home', category: 'Navigation' },
    { key: 'nav.mieterinnen', german: 'Mieterinnen', english: 'Tenants', category: 'Navigation' },
    { key: 'nav.angebot', german: 'Angebot', english: 'Offer', category: 'Navigation' },
    { key: 'nav.ambiente', german: 'Ambiente', english: 'Ambiance', category: 'Navigation' },
    { key: 'nav.gaestebuch', german: 'Gästebuch', english: 'Guest Book', category: 'Navigation' },
    { key: 'nav.kontakt', german: 'Kontakt', english: 'Contact', category: 'Navigation' },

    // Footer
    { key: 'footer.brand', german: 'Rhein Neckar Massage Heidelberg', english: 'Rhein Neckar Massage Heidelberg', category: 'Footer' },
    { key: 'footer.description', german: 'Ihr exklusives Erotik-Massage Studio in Heidelberg. Sinnliche Entspannung in eleganter, diskreter Atmosphäre. Höchste Qualität und absolute Diskretion sind unsere Priorität.', english: 'Your exclusive erotic massage studio in Heidelberg. Sensual relaxation in elegant, discreet atmosphere. Highest quality and absolute discretion are our priority.', category: 'Footer' },
    { key: 'footer.copyright', german: '© 2025 Rhein Neckar Massage. Alle Rechte vorbehalten.', english: '© 2025 Rhein Neckar Massage. All rights reserved.', category: 'Footer' },

    // Common
    { key: 'common.loading', german: 'Lädt...', english: 'Loading...', category: 'Common' },
    { key: 'common.error', german: 'Fehler', english: 'Error', category: 'Common' },
    { key: 'common.notFound', german: 'Nicht gefunden', english: 'Not found', category: 'Common' },
  ]);

  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({ german: '', english: '' });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(languageStrings.map(item => item.category)))];

  const filteredStrings = selectedCategory === 'all'
    ? languageStrings
    : languageStrings.filter(item => item.category === selectedCategory);

  const startEditing = (item: LanguageString) => {
    setEditingKey(item.key);
    setEditValues({ german: item.german, english: item.english });
  };

  const saveEdit = () => {
    if (!editingKey) return;

    setLanguageStrings(prev =>
      prev.map(item =>
        item.key === editingKey
          ? { ...item, german: editValues.german, english: editValues.english }
          : item
      )
    );
    setEditingKey(null);
    setEditValues({ german: '', english: '' });
  };

  const cancelEdit = () => {
    setEditingKey(null);
    setEditValues({ german: '', english: '' });
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="text-rose-400 mr-3"
            >
              <Globe className="w-8 h-8" />
            </motion.div>
            <h1 className="text-4xl font-bold text-white">Language Management</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Manage and translate language strings for your website
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-rose-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {category === 'all' ? 'All Categories' : category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Language Strings Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <CardHover intensity="medium" className="bg-gray-800 border border-rose-900/30 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Key
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      German (DE)
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      English (EN)
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredStrings.map((item, index) => (
                    <motion.tr
                      key={item.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <code className="bg-gray-900 px-2 py-1 rounded text-xs">
                          {item.key}
                        </code>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-rose-900/30 text-rose-400 rounded-full">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {editingKey === item.key ? (
                          <input
                            type="text"
                            value={editValues.german}
                            onChange={(e) => setEditValues(prev => ({ ...prev, german: e.target.value }))}
                            className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white focus:border-rose-500 focus:outline-none"
                          />
                        ) : (
                          <span className="block max-w-xs truncate">{item.german}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {editingKey === item.key ? (
                          <input
                            type="text"
                            value={editValues.english}
                            onChange={(e) => setEditValues(prev => ({ ...prev, english: e.target.value }))}
                            className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white focus:border-rose-500 focus:outline-none"
                          />
                        ) : (
                          <span className="block max-w-xs truncate">{item.english}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {editingKey === item.key ? (
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={saveEdit}
                              className="text-green-400 hover:text-green-300 p-1"
                            >
                              <Check className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={cancelEdit}
                              className="text-red-400 hover:text-red-300 p-1"
                            >
                              <X className="w-4 h-4" />
                            </motion.button>
                          </div>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => startEditing(item)}
                            className="text-rose-400 hover:text-rose-300 p-1"
                          >
                            <Edit2 className="w-4 h-4" />
                          </motion.button>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardHover>
        </motion.div>

        {/* Save All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center space-y-4"
        >
          <div className="flex justify-center space-x-4">
            <Button
              onClick={async () => {
                const success = await refreshTranslations();
                if (success) {
                  alert('Translations refreshed successfully!');
                } else {
                  alert('Failed to refresh translations. Please try again.');
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Translations
            </Button>
            <Button
              onClick={async () => {
                try {
                  const apiBase = import.meta.env.VITE_API_BASE;
                  const response = await fetch(`${apiBase}/language-strings/bulk-update`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ translations: languageStrings.map(ls => ({ key: ls.key, english: ls.english, german: ls.german })) }),
                  });

                  if (!response.ok) throw new Error('Failed to save translations');

                  const payload = await response.json();
                  // Save last_updated for cache checks
                  if (payload.last_updated) localStorage.setItem('language_last_updated', payload.last_updated);

                  // Refresh the in-memory translations from API
                  const refreshed = await refreshTranslations();
                  if (refreshed) {
                    alert('Language strings saved and refreshed successfully!');
                  } else {
                    alert('Language strings saved but refresh failed.');
                  }
                } catch (err) {
                  console.error(err);
                  alert('Failed to save language strings. See console for details.');
                }
              }}
              className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
            >
              <Save className="w-4 h-4 mr-2" />
              Save All Changes
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Languages;