<template>
    <div class="worldBanners">
        <el-row class="leaderboard">
            <el-col>
                <h3>Leaderboard (720x90)</h3>
                <BannerUpload width="100%" height="72px" />
            </el-col>
            <el-col :span="24">
                <BannerUpload width="100%" height="72px" />
            </el-col>
            <el-col :span="24">
                <BannerUpload width="100%" height="72px" />
                <p>Upload a <span>720px by 90px</span> PNG, JPG.</p>
            </el-col>
        </el-row>
        <el-row :gutter="30" class="medium">
            <el-col :span="24">
                <h3>Medium Rectangle (300x250)</h3>
            </el-col>
            <el-col :span="12">
                <BannerUpload width="100%" height="230px" />
            </el-col>
            <el-col :span="12">
                <BannerUpload width="100%" height="230px" />
            </el-col>
            <el-col :span="24">
                <p>Upload a <span>300px by 250px</span> PNG, JPG.</p>
            </el-col>
        </el-row>
        <el-row :gutter="50">
            <el-col :span="24">
                <h3>Skyscrapper (160x600)</h3>
            </el-col>
            <el-col :span="8">
                <BannerUpload width="100%" height="600px" />
            </el-col>
            <el-col :span="8">
                <BannerUpload width="100%" height="600px" />
            </el-col>
            <el-col :span="8">
                <BannerUpload width="100%" height="600px" />
            </el-col>
            <el-col :span="24">
                <p>Upload a <span>160px by 600px</span> PNG, JPG.</p>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import BannerUpload from './BannerUpload.vue';

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
}

.leaderboard {
    .el-col {
        margin-bottom: 10px;
    }

    p {
        margin-top: 10px;
    }
}

.medium {
    margin-bottom: 15px;
}
</style>
