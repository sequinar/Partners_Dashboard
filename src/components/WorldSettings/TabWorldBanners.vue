<template>
  <div class="worldBanners">
    <h3>Leaderboard <span>Upload a </span>720px by 90px <span>PNG, JPG.</span></h3>
    <el-row
      class="leaderboard"
      :gutter="30"
    >
      <el-col
        v-for="(banner, index) in 4"
        :key="'Leaderboard' + index"
        :span="12"
      >
        <BannerUpload
          width="100%"
          height="72px"
          :image="banners.leaderboard[index] ? banners.leaderboard[index] : null"
          @image-update="imageUpdate($event, 'leaderboard', '720x90', index)"
        />
        <BannerCleanUp
          :banner="banners.leaderboard[index]"
          @delete="deleteBanner"
        />
      </el-col>
    </el-row>
    <h3>Square <span>Upload a </span>512px by 512px <span>PNG, JPG.</span></h3>
    <el-row
      :gutter="30"
      class="square"
    >
      <el-col
        v-for="(banner, index) in 4"
        :key="'Square' + index"
        :span="6"
      >
        <BannerUpload
          width="100%"
          height="250px"
          :image="banners.square[index] ? banners.square[index] : null"
          @image-update="imageUpdate($event, 'square', '512x512', index)"
        />
        <BannerCleanUp
          :banner="banners.square[index]"
          :columns="[24, 24]"
          @delete="deleteBanner"
        />
      </el-col>
    </el-row>
    <h3>TV Screens <span>Upload a </span>1920px by 1080px <span>PNG, JPG.</span></h3>
    <el-row
      :gutter="30"
      class="square"
    >
      <el-col
        v-for="(banner, index) in 4"
        :key="'TV_Screens' + index"
        :span="12"
      >
        <BannerUpload
          width="100%"
          height="300px"
          :image="banners.tv_screens[index] ? banners.tv_screens[index] : null"
          @image-update="imageUpdate($event, 'tv_screens', '1920x1080', index)"
        />
        <BannerCleanUp
          :banner="banners.tv_screens[index]"
          :columns="[24, 24]"
          @delete="deleteBanner"
        />
      </el-col>
    </el-row>
    <h3>Rectangle <span>Upload a </span>300px by 250px <span>PNG, JPG.</span></h3>
    <el-row
      :gutter="30"
      class="square"
    >
      <el-col
        v-for="(banner, index) in 4"
        :key="'Rectangle' + index"
        :span="6"
      >
        <BannerUpload
          width="100%"
          height="200px"
          :image="banners.rectangle[index] ? banners.rectangle[index] : null"
          @image-update="imageUpdate($event, 'rectangle', '300x250', index)"
        />
        <BannerCleanUp
          :banner="banners.rectangle[index]"
          :columns="[24, 24]"
          @delete="deleteBanner"
        />
      </el-col>
    </el-row>
    <h3>Skyscrapper <span>Upload a</span> 160px by 600px <span>PNG, JPG.</span></h3>
    <el-row
      :gutter="72"
      class="skyscrapper"
    >
      <template
        v-for="(banner, index) in 4"
        :key="'Skyscrapper' + index"
      >
        <el-col :span="6">
          <BannerUpload
            width="160px"
            height="600px"
            :image="banners.skyscrapper[index] ? banners.skyscrapper[index] : null"
            @image-update="imageUpdate($event, 'skyscrapper', '160x600', index)"
          />
          <BannerCleanUp
            :banner="banners.skyscrapper[index]"
            :columns="[24, 24]"
            @delete="deleteBanner"
          />
        </el-col>
      </template>
    </el-row>
    <el-row>
      <el-col
        :span="24"
        class="d-flex direction-column align-center justify-center"
      >
        <el-button
          class="previewWorld"
          type="primary"
          size="large"
        >
          Preview World
        </el-button>
        <small>* The sizes are a scaled representation of the actual dimensions of the ads inside the
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
    'square': {},
    'tv_screens': {},
    'rectangle': {},
    'skyscrapper': {}
})

const setBanners = () => {
    if (!props.world.banner_urls) return;
    props.world.banner_urls.forEach(banner => {
        banners.value[banner.placement][banner.position] = banner;
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
    banners.value[banner.placement][banner.position] = null;
}
onMounted(() => {
    setBanners();
})

watch(() => props.world.banner_urls, () => {
    setBanners();
})

</script>

<style lang="scss">
.el-button--primary {
  margin-top: 10px;
}

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
        margin-bottom: 10px;
        width: 580px;
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

    .el-button--primary {
      margin-top: 0;
    }
}

.counter {
    font-size: 14px;
    font-family: 'Montserrat-Bold';
}
</style>
