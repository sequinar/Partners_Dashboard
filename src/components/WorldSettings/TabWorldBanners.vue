<template>
  <div class="worldBanners">
    <el-row class="leaderboard">
      <h3>Leaderboard <span>Upload a </span>720px by 90px <span>PNG, JPG.</span></h3>
      <el-col
        v-for="(banner, index) in 3"
        :key="'Leaderboard' + index"
      >
        <BannerUpload
          width="100%"
          height="72px"
          :image="banners.leaderboard[index] ? banners.leaderboard[index] : null"
          @image-update="imageUpdate($event, 'Leaderboard', '720x90', index)"
        />
        <BannerCleanUp
          :banner="banners.leaderboard[index]"
          @delete="deleteBanner"
        />
      </el-col>
    </el-row>
    <el-row
      :gutter="30"
      class="medium"
    >
      <el-col :span="24">
        <h3>Medium Rectangle <span>Upload a </span>300px by 250px <span>PNG, JPG.</span></h3>
      </el-col>
      <el-col
        v-for="(banner, index) in 2"
        :key="'Medium_Rectangle' + index"
        :span="12"
      >
        <BannerUpload
          width="100%"
          height="230px"
          :image="banners.medium[index] ? banners.medium[index] : null"
          @image-update="imageUpdate($event, 'Medium Rectangle', '300x250', index)"
        />
        <BannerCleanUp
          :banner="banners.medium[index]"
          :columns="[24, 24]"
          @delete="deleteBanner"
        />
      </el-col>
    </el-row>
    <el-row
      :gutter="20"
      class="skyscrapper"
    >
      <el-col :span="24">
        <h3>Skyscrapper <span>Upload a</span> 160px by 600px <span>PNG, JPG.</span></h3>
      </el-col>
      <template
        v-for="(banner, index) in 3"
        :key="'Skyscrapper' + index"
      >
        <el-col :span="1">
          <span class="counter">{{ banner }}.</span>
        </el-col>
        <el-col :span="7">
          <BannerUpload
            width="100%"
            height="600px"
            :image="banners.skyscrapper[index] ? banners.skyscrapper[index] : null"
            @image-update="imageUpdate($event, 'Skyscrapper', '160x600', index)"
          />
        </el-col>
      </template>
    </el-row>
    <el-row class="skyscrapper__cleanUp">
      <template
        v-for="(banner, index) in 3"
        :key="'el-col'+ banner"
      >
        <el-col
          :span="1"
          class="d-flex align-center"
        >
          <span class="counter">{{ banner }}.</span>
        </el-col>
        <el-col :span="23">
          <BannerCleanUp
            :banner="banners.skyscrapper[index]"
            :columns="[17, 7]"
            @delete="deleteBanner"
          />
        </el-col>
      </template>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button
          class="previewWorld full-width"
          type="primary"
          size="large"
        >
          Preview World
        </el-button>
        <small>* The sizes are a scaled representation of the actua dimensions of the ads inside the
          world.</small>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import BannerUpload from './components/BannerUpload.vue';
import BannerCleanUp from './components/BannerCleanUp.vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { ref, onMounted, watch } from 'vue';

const route = useRoute();
const store = useStore();
const props = defineProps({
  world: {
    type: Object,
    default: () => {}
  }
});

const banners = ref({
    'leaderboard': {},
    'medium': {},
    'skyscrapper': {}
})

const setBanners = () => {
    if (!props.world.banner_urls) return;
    props.world.banner_urls.forEach(banner => {
        banners.value[banner.placement.split(' ')[0].toLowerCase()][banner.position] = banner;
    })
}

const imageUpdate = (formData, placement, size, index) => {
    formData.append("placement", placement);
    formData.append("size", size);
    formData.append("position", index);
    store.dispatch('worlds/updateBanners', {
        id: route.params.id,
        formData: formData
    })
}

const deleteBanner = (banner) => {
    banners.value[banner.placement.split(' ')[0].toLowerCase()][banner.position] = null;
}
onMounted(() => {
    setBanners();
})

watch(() => props.world.banner_urls, () => {
    setBanners();
})

</script>

<style lang="scss">
.worldBanners {
    h3 {
        font-size: 14px;
        font-family: 'Montserrat-Bold';
        margin-bottom: 10px;

        span {
            font-family: 'Montserrat-Light';
        }
    }

    small {
        font-size: 12px;
        font-style: italic;
    }

    .previewWorld {
        margin-top: 50px;
    }
}

.leaderboard {
    .el-col {
        margin-bottom: 10px;
    }

    p {
        margin-top: -5px;
        margin-bottom: 10px;
    }
}

.medium {
    margin-bottom: 15px;

    .el-button {
        margin-top: 10px;
    }
}

.counter {
    font-size: 14px;
    font-family: 'Montserrat-Bold';
}
</style>
