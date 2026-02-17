<template>
  <div>
    <Navbar></Navbar>
    <div class="d-flex">

      <Sidebar></Sidebar>
      <!-- Main Content -->
      <div class="flex-grow-1 content p-4">
        <!-- Page Title -->
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="fw-bold">Article List</h3>
          <div>
            <select v-model="Choose" class="form-select" aria-label="Default select example">
              <option selected disabled="true">Open this select menu</option>
              <option value="desc">desc</option>
              <option value="asc">asc</option>
            </select>
          </div>
          <div class=" mb-3">
              <input type="text" class="form-control" placeholder="Search Articles" v-model="search">
            </div>
        </div>

        <!-- Stats -->
        <div class="row mb-4">
          <div class="col-md-4">
            <div class="card p-3">
              <h6>Total Articles</h6>
              <h3 class="fw-bold">120</h3>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card p-3">
              <h6>Published</h6>
              <h3 class="fw-bold text-success">85</h3>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card p-3">
              <h6>Draft</h6>
              <h3 class="fw-bold text-warning">35</h3>
            </div>
          </div>
        </div>

        <!-- Article Cards -->
        <div class="row g-4"> 
          <BaseCard :articles="ArticleStore.articles"></BaseCard>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import { useArticleStore } from '@/stores/article';
import { onMounted, ref, watch } from 'vue';

let ArticleStore = useArticleStore()
let search = ref('')
let Choose = ref('')


onMounted (async () =>{
  await ArticleStore.fecthArticles();
})

watch([search, Choose], async ([newSearch , newChoose] )=>{
  await ArticleStore.fecthArticles({
    search : newSearch ,
    sortDir : newChoose
  })  
})
</script>

<style  scoped> </style>