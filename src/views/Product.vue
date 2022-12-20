<template>
    <el-container id="product" class="direction-column">
        <el-row :gutter="60">
            <el-col :span="15">
                <div class="d-flex justify-between">
                    <h1 class="title">Create New Item</h1>
                    <el-button type="primary" link :icon="ArrowLeft" @click="router.push('/')">Back to Worlds
                    </el-button>
                </div>
                <p class="description">Image, video, audio, or 3D model<span class="red">*</span></p>
                <WorldUploadImage width="100%" height="300px" :types="imageTypes" max-size="50MB" />
                <custom-input v-model="product.name" placeholder="Item name" max-length="20" label="Name" required>
                </custom-input>
                <custom-input v-model="product.name" placeholder="External link" label="External link" description="Hydrogen will include a link to this URL on this item's minting page,
                    so users can click to mint it. You are welcome to link your own webpage with more details.">
                </custom-input>
                <custom-input v-model="product.description" placeholder="Provide a detailed description of your item."
                    max-length="300" label="Description"
                    description="The description will be included on the item's minting page underneath its image."
                    type="textarea" rows="4">
                </custom-input>
                <custom-select v-model="product.categories" label="Categories" :options="capabilities"
                    description="Select the categories that applys to your item." placeholder="Select categories"
                    multiple>
                </custom-select>
                <custom-switcher v-model="product.unlockableContent" label="Unlockable content"
                    description="Include unloackable content that can only be revealed by the owner of the item.">
                </custom-switcher>
                <custom-input v-model="product.keyID" placeholder="Key ID"></custom-input>
                <custom-switcher v-model="product.unlockableContent" label="Explicit & sensitive content (18+)"
                    description="Set this item as explicit and sensitive content.">
                </custom-switcher>
                <custom-input v-model="product.name" placeholder="000" label="Supply"
                    description="The number of copies that can be minted">
                </custom-input>
                <el-row :gutter="10">
                    <el-col :span="8">
                        <custom-select v-model="product.categories" label="Blockchain" :options="capabilities">
                        </custom-select>
                    </el-col>
                    <el-col :span="7" class="d-flex align-end">
                        <custom-input v-model="product.name" placeholder="000"></custom-input>
                    </el-col>
                    <el-col :span="9" class="d-flex justify-end direction-column">
                        <p class="mb-6">Service Fee 2.5 %   Creators Fee 10%</p>
                        <span><b>Price in USD:</b> 0,000,000.00</span>
                    </el-col>
                </el-row>
                <custom-switcher v-model="product.unlockableContent" label="Whitelist"
                    description="Set this item for a whitelist period.">
                </custom-switcher>
                <el-row :gutter="10">
                    <el-col :span="8">
                        <custom-select v-model="product.categories" label="Timezone" :options="capabilities">
                        </custom-select>
                    </el-col>
                    <el-col :span="7" class="d-flex align-end">
                        <custom-input v-model="product.name" placeholder="000"></custom-input>
                    </el-col>
                    <el-col :span="9" class="d-flex justify-end direction-column">
                        <p class="mb-6">Service Fee 2.5 %   Creators Fee 10%</p>
                        <span><b>Price in USD:</b> 0,000,000.00</span>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="8">
                <div class="publish">
                    <h3>Publish</h3>
                    <p>Publish, save as a draft or preview.</p>
                    <el-row class="mt-15" :gutter="15">
                        <el-col :span="12">
                            <el-button class="full-width" type="primary" plain size="large">Save Draft</el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button class="full-width" type="primary" plain size="large">Preview</el-button>
                        </el-col>
                    </el-row>
                    <div class="mt-10 d-flex justify-between align-center">
                        <h3>Released on:</h3>
                        <el-button type="primary" size="large" link>Edit</el-button>
                    </div>
                    <p class="relised-date ma-0">Aug 24, 2022 at 9:19 AM</p>
                    <el-row class="mt-15" :gutter="15">
                        <el-col :span="12">
                            <el-button class="full-width" type="primary" link size="large">Archive World</el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button class="full-width" type="primary" size="large">Publish</el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </el-container>
</template>

<script setup>
import WorldUploadImage from '@/components/worlds/WorldUploadImage.vue'
import CustomInput from '@/components/forms/CustomInput.vue'
import CustomSelect from '@/components/forms/CustomSelect.vue'
import CustomSwitcher from '../components/forms/CustomSwitcher.vue'
import { ArrowLeft } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'

const router = useRouter()
const imageTypes = ['JPG', 'PNG', 'GIF', 'SVG', 'MP4', 'WEBM', 'WAV', 'OGG', 'GLB', 'GLTF']
const product = reactive({
  name: '',
  description: '',
  categories: [],
  unlockableContent: true,
  keyID: ''
})
const capabilities = [
  {
    value: 'Option1',
    label: 'Option1'
  },
  {
    value: 'Option2',
    label: 'Option2'
  }
]
</script>

<style lang="scss">
#product {
    max-width: 1000px;
    color: #1c1c1c;
    font-size: 12px;
    padding-bottom: 15px;
    margin: 0 auto;

    .title {
        font-size: 30px;
        font-family: 'Montserrat-SemiBold';
        margin: 0;
    }

    .description {
        font-size: 14px;
        font-family: 'Montserrat-SemiBold';
        line-height: 20px;
    }

    .el-input__wrapper {
        background-color: #fff;
        padding: 0;
        padding: 5px 15px;
        margin-top: 5px;
    }

    .el-textarea__inner {
        box-shadow: none;
    }

    h3 {
        margin: 0;
        font-size: 16px;
        font-family: 'Montserrat-Bold';
    }

    .el-dialog__body {
        img {
            width: 100%;
        }
    }

    .el-select {
        display: block;
    }

    .publish,
    .thumbnail {
        background-color: #fff;
        border-radius: 10px;
        padding: 15px 10px;
        overflow: hidden;

        p {
            font-size: 12px;
            margin: 0;
            line-height: 24px;
            margin-bottom: 5px;
        }

        .relised-date {
            font-size: 14px;
            margin-top: 10px;
            margin-bottom: 20px;
        }
    }

    .el-button {
        font-family: 'Montserrat-SemiBold';

        &.is-link {
            height: 40px;
            font-style: italic;
            text-decoration: underline;
        }
    }

    .thumbnail {

        .el-upload-list__item,
        .el-upload--picture-card {
            width: 275px;
            height: 275px;
            margin: 0 auto;
        }
    }
}
</style>
