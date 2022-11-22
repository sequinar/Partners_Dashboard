<template>
  <div id="listingsPage">
    <el-row>
      <el-col :span="12">
        <h1 class="pageTitle">
          Listings or Products
        </h1>
      </el-col>
      <el-col :span="12" class="buttonsGroup d-flex align-center">
        <el-input v-model="search" size="large" placeholder="Search for a item">
          <template #prefix>
            <img src="../assets/icons/Search.svg" alt="Search">
          </template>
        </el-input>
        <el-button type="primary" size="large" :icon="Plus" @click="router.push('/new-product')">Add Item</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="statuses d-flex">
          <p><a href="#">All</a>(6) <span class="separator">|</span></p>
          <p><a href="#">Minting</a>(6) <span class="separator">|</span></p>
          <p><a href="#">Whitelisted</a>(6) <span class="separator">|</span></p>
          <p><a href="#">Draft</a>(6)</p>
        </div>
      </el-col>
      <el-col :span="12">
      </el-col>
    </el-row>
    <el-row class="listingsTable">
      <el-table v-loading="loading" :data="data" style="width: 100%">
        <el-table-column prop="image" label="Image">
          <template #default="scope">
            <img class="listingsTable__image" :src="scope.row.image" alt="list image">
          </template>
        </el-table-column>
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="supply" label="Supply" />
        <el-table-column prop="price" label="Price" />
        <el-table-column prop="status" label="Status" />
        <el-table-column prop="content" label="Unlockable content ">
          <template #default="scope">
            <div class="d-flex justify-center">
              <el-icon v-if="scope.row.content" color="#603A96"><Select /></el-icon>
              <el-icon v-else color="#F00">
                <CloseBold />
              </el-icon>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="categories" label="Categories" />
      </el-table>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus, Select, CloseBold } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const search = ref('')
const data = [
  {
    image: 'https://worlds-assets.s3.amazonaws.com/users/62822618bfa1140069dd4a40_1660115296102',
    name: 'Name',
    supply: '000/500',
    price: '1 ETH',
    status: 'Published',
    content: true,
    categories: 'New category Name'
  }
]
const loading = ref(false)
</script>

<style lang="scss">
#listingsPage {
  .el-input__wrapper {
    background-color: #fff;
    margin-right: 35px;
  }

  .statuses {

    a,
    p,
    span {
      font-size: 14px;
    }

    .separator {
      margin: 0 10px;
      font-weight: bold;
    }
  }

  .listingsTable {
    .el-table {
      background-color: transparent;

      tr,
      .el-table__cell {
        background-color: transparent;
        z-index: unset;
      }
    }

    &__image {
      width: 60px;
      height: 60px;
      border-radius: 5px;
    }
  }
}
</style>
