import Button from '@components/ui/Button'

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange, className = "" }) => {
  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <div className={`mb-8 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Filter by Category
      </h3>
      
      <div className="flex flex-wrap justify-center gap-2">
        {/* All Categories Button */}
        <Button
          variant={selectedCategory === '' ? 'primary' : 'outline'}
          size="small"
          onClick={() => onCategoryChange('')}
          className="transition-all duration-300"
        >
          All Categories
        </Button>
        
        {/* Category Buttons */}
        {categories.map((category) => (
          <Button
            key={category._id}
            variant={selectedCategory === category._id ? 'primary' : 'outline'}
            size="small"
            onClick={() => onCategoryChange(category._id)}
            className="capitalize transition-all duration-300"
          >
            {category._id} ({category.count})
          </Button>
        ))}
      </div>
    </div>
  )
}

export default CategoryFilter