import { useMemo, useState } from 'react'
import catalogItems, { categoryOptions, conditionOptions } from '../data/catalogItems.js'
import SelectCustom from '../components/SelectCustom.jsx'

function Catalogo() {
  const [category, setCategory] = useState('')
  const [condition, setCondition] = useState('')
  const [appliedFilters, setAppliedFilters] = useState({ category: '', condition: '' })

  const filteredItems = useMemo(() => {
    return catalogItems.filter((item) => {
      const matchesCategory = !appliedFilters.category || item.category === appliedFilters.category
      const matchesCondition = !appliedFilters.condition || item.condition === appliedFilters.condition
      return matchesCategory && matchesCondition
    })
  }, [appliedFilters])

  function handleSubmit(event) {
    event.preventDefault()
    setAppliedFilters({ category, condition })
  }

  return (
    <section id="catalog-section">
      <h1 className="page-title">Catálogo de materiais</h1>
      <div className="catalog-intro">
        <p>
          Explore os materiais escolares disponíveis para doação. Use os
          filtros para encontrar o que você precisa por categoria ou estado
          de conservação.
        </p>

        <form id="catalog-filters" onSubmit={handleSubmit}>
          <div className="catalog-filters__field catalog-filters__field--category">
            <label htmlFor="filter-category">Categoria</label>
            <SelectCustom
              id="filter-category"
              name="category"
              options={categoryOptions}
              value={category}
              onChange={setCategory}
            />
          </div>

          <div className="catalog-filters__field catalog-filters__field--condition">
            <label htmlFor="filter-condition">Estado de conservação</label>
            <SelectCustom
              id="filter-condition"
              name="condition"
              options={conditionOptions}
              value={condition}
              onChange={setCondition}
            />
          </div>

          <button type="submit" className="btn btn--primary">Filtrar</button>
        </form>
      </div>

      <div className="catalog-grid">
        {filteredItems.map((item) => (
          <article key={item.id} className="catalog-card card-surface">
            <figure className="catalog-card__figure">
              <img className="catalog-card__image" src={item.image} alt={item.alt} />
              <figcaption className="catalog-card__category">{item.categoryLabel}</figcaption>
            </figure>

            <div className="catalog-card__body">
              <small className={`catalog-card__condition catalog-card__condition--${item.condition}`}>
                {item.conditionLabel}
              </small>

              <h2 className="catalog-card__title">{item.title}</h2>

              <ul className="catalog-card__meta">
                <li>📍 {item.location}</li>
                <li>👤 Doado por {item.donor}</li>
              </ul>

              <button type="button" className="btn btn--primary catalog-card__cta">Tenho Interesse</button>
            </div>
          </article>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <p id="no-results" className="catalog-empty">
          Nenhum item encontrado para os filtros selecionados.
        </p>
      )}
    </section>
  )
}

export default Catalogo
