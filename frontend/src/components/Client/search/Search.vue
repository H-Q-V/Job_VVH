<template>
  <div class="search-container">
    <SearchHeader />
    <SearchForm @search-results="handleSearchResults"  />
    <Footer />
  </div>
</template>

<script>
import SearchHeader from './SearchHeader.vue';
import SearchForm from './SearchForm.vue';
import Footer from './Footer.vue';

export default {
  components: {
    SearchHeader,
    SearchForm,
    Footer
  },
  data() {
    return {
      searchResults: []
    };
  },
  methods: {
    handleSearchResults(results) {
      this.searchResults = results; 
      console.log('Search results received in Search.vue:', this.searchResults); 

    },
    handleSearchInput(query) {
    }
  }
}
</script>

<style scoped>
.search-container {
  padding: 20px; 
  background-color: #f8f9fa; 
  min-height: 100vh; 
}
.search-container > * {
  margin-bottom: 20px; 
}
</style>