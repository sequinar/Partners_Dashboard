<template>
  <el-upload
    class="avatar-uploader"
    :auto-upload="false"
    accept="image/*"
    action="#"
    :show-file-list="false"
    :on-change="handleAvatarSuccess"
  >
    <el-avatar
      v-if="imageUrl"
      :src="imageUrl"
      size="large"
    />
    <div class="avatar-uploader-icon">
      <img
        src="@/assets/icons/EditIcon.svg"
        alt="EditIcon"
      >
    </div>
  </el-upload>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({
  userAvatar: {
    type: String,
    default: ''
  }
});
const imageUrl = ref(props.userAvatar);

const handleAvatarSuccess = (res) => {
  if (res.raw.type == 'image/jpeg' || res.raw.type == 'image/png') {
    imageUrl.value = URL.createObjectURL(res.raw)
    toDataURL(imageUrl.value)
      .then(dataUrl => {
        store.dispatch('updateUser', {
          picture: dataUrl
        })
      })
  } else {
    ElMessage.error('Avatar picture must be JPG or PNG format!')
  }
}

const toDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  }))
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
