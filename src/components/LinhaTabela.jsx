export default function LinhaTabela({
  item,
  aoEditar,
  aoAumentarRaio,
  aoDeletar,
  salvando,
}) {
  return (
    <tr className="border-b border-[var(--border-line)]/60 transition-colors hover:bg-[var(--bg-card)]">
      <td className="py-4 pr-4">
        <span className="font-mono-tech text-sm font-semibold text-[var(--text-main)]">
          {item.codigo}
        </span>
        <span className="mt-0.5 block text-xs text-[var(--text-body)]">
          {item.orgao}
        </span>
      </td>

      <td className="py-4 px-4 text-sm text-[var(--text-main)]">
        {item.ocorrencia}
      </td>

      <td className="py-4 px-4 text-sm text-[var(--text-body)]">
        {item.origem} →{' '}
        <strong className="font-semibold text-[var(--text-main)]">
          {item.destino}
        </strong>
      </td>

      <td className="py-4 px-4">
        <span className="font-mono-tech text-sm text-[var(--text-main)]">
          {item.raio} m
        </span>
      </td>

      <td className="py-4 pl-4 text-right">
        <div className="inline-flex flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => aoAumentarRaio(item)}
            disabled={salvando}
            className="rounded-full border border-[var(--border-line)] px-3 py-1 text-xs font-medium text-[var(--text-main)] transition-colors hover:bg-[#34472A] hover:text-[#E9E6D5] disabled:opacity-50"
          >
            +200m
          </button>

          <button
            type="button"
            onClick={() => aoEditar(item)}
            disabled={salvando}
            className="rounded-full border border-[var(--border-line)] px-3 py-1 text-xs font-medium text-[var(--text-main)] transition-colors hover:bg-[#34472A] hover:text-[#E9E6D5] disabled:opacity-50"
          >
            Editar
          </button>

          <button
            type="button"
            onClick={() => aoDeletar(item.id)}
            disabled={salvando}
            className="rounded-full bg-[#741923] px-3 py-1 text-xs font-medium text-[#E9E6D5] transition-colors hover:bg-[#5c121b] disabled:opacity-50"
          >
            Encerrar
          </button>
        </div>
      </td>
    </tr>
  );
}
