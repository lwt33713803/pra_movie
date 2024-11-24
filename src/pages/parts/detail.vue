<template>
  <div
    class="p-[25px] box-border w-full min-h-[400px] bg-white rounded-md shadow-sm border border-gray-100"
  >
    <h1 class="border-b border-solid border-gray-100 py-[10px] text-[20px] leading-normal">
      {{ item.name_cn }}
    </h1>
    <div class="flex flex-col lg:flex-row gap-[20px]">
      <img
        :src="item.cover"
        class="w-[800px]"
        alt=""
        srcset=""
      />
      <div class="flex flex-col text-[16px] text-gray-600">
        <span>番号：{{ item.codes }} </span>

        <span> {{ item?.detail?.pushed_at }} </span>

        <span>{{ item?.detail?.timer }} </span>
        <span>类型：</span>
        <div class="grid grid-cols-4 lg:flex lg:flex-wrap gap-[5px]">
          <span v-for="tag in item?.tags_arr" class="bg-blue-600 px-[10px] rounded-sm text-[14px] text-white text-center">
            {{ tag }}
          </span>
        </div>

        <span>{{ item?.detail?.pusher }} </span>

      </div>
    </div>
  </div>
  <div
    class="p-[15px] bg-white border-gray-100 border mt-[15px] rounded-md shadow-sm flex flex-col gap-[5px]"
  >
    <span class="text-bold">详情</span>
    <small class="text-[16px]"
      >{{ item?.name_cn }}</small
    >
    <p class="text-[14px] text-gray-300">
      &nbsp;&nbsp;&nbsp;&nbsp;{{ item?.detail?.desc  }}
    </p>
  </div>

  <div  class="p-[15px] bg-white border-gray-100 border mt-[15px] rounded-md shadow-sm flex flex-col gap-[5px]">
        <div>磁力资源 </div>
        <div class="flex flex-col text-[16px] gap-[3px] text-gray-500">
          <div class="flex flex-col lg:flex-row gap-[10px] hover:bg-gray-100 hover:cursor-pointer px-[15px] py-[4px] border" 
            v-for="mag in item?.res"
            @click="handlerCopy(mag.magnet)"
          >
            <span class="flex-1"> 🧲  {{ mag.magnet }}</span>
            <span class="w-[80px] bg-blue-300 text-center rounded-sm pt-[3px]">复制</span>
          </div>
          
        </div>
  </div>

  <div
    class="p-[15px] bg-white border-gray-100 border mt-[15px] rounded-md shadow-sm flex flex-col gap-[5px]"
  >
    <span class="text-bold">预览</span>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[10px]">
      <div v-for="img in previews">
        <img
          :src="img"
          class="w-full"
          alt=""
          srcset=""
        />
      </div>
      
    </div>
  </div>
</template>

<script setup>
    import { defineProps, onMounted,ref } from 'vue';

    const props = defineProps({
        code:{
            type: String,
            required: true
        }
    });

    const item = ref({})
    const previews = ref([]);

    const getLists = async (code_video) => {
        let action = {
            'code':code_video,
        };
        const url = `https://pedraapi.1414210199.workers.dev/detail`;
        // const url = `http://localhost:8787/detail`;
        const options = {
            method: "POST",
            body: JSON.stringify(action),
        };
        const res = await fetch(url, options);
        const { code, data } = await res.json();
        console.log(data)
        if (code == 0) {
            item.value = data;
            previews.value = JSON.parse(data?.img_preview ?? '[]');
            item.value.tags_arr = data.tags.split(',')
        }
    };

    const handlerCopy = (text)=>{
      if (navigator.clipboard) {
          navigator.clipboard.writeText(text);
          alert("复制成功")
      } else {
          var textarea = document.createElement('textarea');
          document.body.appendChild(textarea);
          textarea.style.position = 'fixed';
          textarea.style.clip = 'rect(0 0 0 0)';
          textarea.style.top = '10px';
          textarea.value = text;
          textarea.select();
          document.execCommand('copy', true);
          document.body.removeChild(textarea);
          alert("复制成功")
      }
      
    }

    onMounted(async()=>{
        getLists(props.code);
    })
</script>

