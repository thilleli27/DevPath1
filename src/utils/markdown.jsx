// src/utils/markdown.jsx
// Rendu Markdown simplifié pour les fiches de cours.
// Supporte : h2, h3, listes, code inline, blocs de code, tableaux, paragraphes.

const inlineFormat = (text) =>
  text
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

export const renderMarkdown = (text) => {
  const lines = text.split('\n');
  const elements = [];
  let inCode = false;
  let codeLines = [];
  let inTable = false;
  let tableRows = [];
  let listBuffer = [];

  const flushList = (key) => {
    if (listBuffer.length === 0) return;
    elements.push(
      <ul key={`ul-${key}`}>
        {listBuffer.map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
        ))}
      </ul>
    );
    listBuffer = [];
  };

  const flushTable = (key) => {
    if (tableRows.length === 0) return;
    const validRows = tableRows.filter((r) => !/^\|[-| :]+\|$/.test(r.trim()));
    elements.push(
      <table key={`table-${key}`}>
        <tbody>
          {validRows.map((row, ri) => {
            const cells = row.split('|').filter((c) => c.trim() !== '');
            return (
              <tr key={ri}>
                {cells.map((cell, ci) =>
                  ri === 0 ? (
                    <th key={ci} dangerouslySetInnerHTML={{ __html: inlineFormat(cell.trim()) }} />
                  ) : (
                    <td key={ci} dangerouslySetInnerHTML={{ __html: inlineFormat(cell.trim()) }} />
                  )
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
    tableRows = [];
    inTable = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Blocs de code
    if (line.startsWith('```')) {
      if (!inCode) {
        flushList(i);
        flushTable(i);
        inCode = true;
        codeLines = [];
      } else {
        elements.push(
          <pre key={`pre-${i}`}>
            <code>{codeLines.join('\n')}</code>
          </pre>
        );
        inCode = false;
        codeLines = [];
      }
      continue;
    }
    if (inCode) { codeLines.push(line); continue; }

    // Tableaux
    if (line.startsWith('|')) {
      flushList(i);
      inTable = true;
      tableRows.push(line);
      continue;
    }
    if (inTable) { flushTable(i); }

    // Titres
    if (line.startsWith('## ')) {
      flushList(i);
      elements.push(<h2 key={i}>{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      flushList(i);
      elements.push(<h3 key={i}>{line.slice(4)}</h3>);
    }
    // Listes
    else if (line.startsWith('- ')) {
      listBuffer.push(line.slice(2));
    }
    // Lignes vides
    else if (line.trim() === '') {
      flushList(i);
    }
    // Paragraphes
    else {
      flushList(i);
      elements.push(
        <p key={i} dangerouslySetInnerHTML={{ __html: inlineFormat(line) }} />
      );
    }
  }

  flushList('end');
  flushTable('end');

  return elements;
};