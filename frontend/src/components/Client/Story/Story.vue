<template>
    <div id="app">
        <Header />
        <MainContent />
        <Footer />
    </div>
</template>

<script>
import Header from './Header.vue';
import MainContent from './MainContent.vue';
import Footer from './Footer.vue';

export default {
    name: 'App',
    components: {
        Header,
        MainContent,
        Footer
    }
}
</script>

<style>
/* Add your global styles here */
</style>