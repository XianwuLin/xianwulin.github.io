export default class Archive {
  constructor () {
    this.categories = document.getElementsByClassName("category")
    this.posts = document.getElementsByClassName("post__list_item")

    this.init()

    // Bind click event to every category element.
    let _this = this
    for ( let category of this.categories ) {
      category.addEventListener("click", function() {
        if ( this != _this.current ) {
          _this.change(this)
        }
      })
    }
  }

  /**
   * Get the current category from the link's hash.
   */
  init() {
    let hash = window.location.hash.slice(1)
    this.current = this.categories[0]
    if ( hash != "" ) {
      for ( let category of this.categories ) {
        let escapedCat = encodeURI(category.getAttribute("data-category"))
        if ( hash == escapedCat ) {
          this.change(category)
          return
        }
      }
    }
  }

  /**
   * Hide the links whose categories are not equal to the current category;
   * @param {element} category The current category.
   */
  filter(category) {
    for( let post of this.posts ) {
      let cat = post.getAttribute("data-category")
      if ( cat.indexOf(category) > -1 || category == "all" ) {
        post.style.display = "block"
      } else {
        post.style.display = "none"
      }
    }
  }

  /**
   * Change the current category.
   * @param {element} category The current category.
   */
  change(category) {
    this.current.classList.remove("active")
    this.current = category
    category.classList.add("active")
    this.filter(category.getAttribute("data-category"))
  }
}
