<template>
    <el-upload class="avatar-uploader" :auto-upload="false" accept="image/*" action="#" :show-file-list="false"
        :on-change="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
        <el-avatar v-if="imageUrl" :src="imageUrl" size="large" />
        <div class="avatar-uploader-icon">
            <img src="@/assets/icons/EditIcon.svg" alt="EditIcon" />
        </div>
    </el-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Edit } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'

const props = defineProps(['userAvatar']);
const imageUrl = ref(props.userAvatar);

const handleAvatarSuccess = (res) => {
    console.log(URL.createObjectURL(res.raw!));

    imageUrl.value = URL.createObjectURL(res.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 1) {
        ElMessage.error('Avatar picture size can not exceed 1MB!')
        return false
    }
    return true
}
</script>

<style lang="scss">
.el-upload {
    position: relative;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 56px;
    height: 56px;
    border: 2px solid #fff;
    text-align: center;
    border-radius: 50%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.7);
    transition: all 0.3s ease;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        opacity: 1;
    }
}
</style>
