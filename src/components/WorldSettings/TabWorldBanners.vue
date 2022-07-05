<template>
    <div class="worldBanners">
        <el-row class="leaderboard">
            <h3>Leaderboard (720x90)</h3>
            <el-col v-for="(banner, index) in 3" :key="'Leaderboard' + index">
                <BannerUpload width="100%" height="72px" :image="leaderboards[index] ? leaderboards[index] : null"
                    @image-update="imageUpdate($event, 'Leaderboard', '720x90', index)" />
            </el-col>
            <p>Upload a <span>720px by 90px</span> PNG, JPG.</p>
        </el-row>
        <el-row :gutter="30" class="medium">
            <el-col :span="24">
                <h3>Medium Rectangle (300x250)</h3>
            </el-col>
            <el-col :span="12" v-for="(banner, index) in 2" :key="'Medium_Rectangle' + index">
                <BannerUpload width="100%" height="230px"
                    :image="mediumRectangles[index] ? mediumRectangles[index] : null"
                    @image-update="imageUpdate($event, 'Medium Rectangle', '300x250', index)" />
            </el-col>
            <el-col :span="24">
                <p>Upload a <span>300px by 250px</span> PNG, JPG.</p>
            </el-col>
        </el-row>
        <el-row :gutter="50">
            <el-col :span="24">
                <h3>Skyscrapper (160x600)</h3>
            </el-col>
            <el-col :span="8" v-for="(banner, index) in 3" :key="'Skyscrapper' + index">
                <BannerUpload width="100%" height="600px" :image="skyscrappers[index] ? skyscrappers[index] : null"
                    @image-update="imageUpdate($event, 'Skyscrapper', '160x600', index)" />
            </el-col>
            <el-col :span="24">
                <p>Upload a <span>160px by 600px</span> PNG, JPG.</p>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-button class="previewWorld full-width" type="primary" size="large">Preview World</el-button>
                <small>* The sizes are a scaled representation of the actua dimensions of the ads inside the
                    world.</small>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import BannerUpload from './components/BannerUpload.vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const store = useStore();
const props = defineProps(['world']);

const leaderboards = computed(() => props.world.banner_urls ? props.world.banner_urls.filter(banner => banner.placement === 'Leaderboard') : []);
const mediumRectangles = computed(() => props.world.banner_urls ? props.world.banner_urls.filter(banner => banner.placement === 'Medium Rectangle') : []);
const skyscrappers = computed(() => props.world.banner_urls ? props.world.banner_urls.filter(banner => banner.placement === 'Skyscrapper') : []);

const imageUpdate = (formData, placement, size, index) => {
    formData.append("placement", placement);
    formData.append("size", size);
    formData.append("position", index);
    store.dispatch('worlds/updateBanners', {
        id: route.params.id,
        formData: formData
    })
}
</script>

<style lang="scss" scoped>
.worldBanners {
    h3 {
        font-size: 14px;
        font-family: 'Montserrat-Bold';
        margin-bottom: 5px;
    }

    p {
        font-size: 14px;
        margin-bottom: 0;

        span {
            font-family: 'Montserrat-Bold';
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
}
</style>
