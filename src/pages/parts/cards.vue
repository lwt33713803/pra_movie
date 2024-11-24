<template>
  <a
    :href="`/detail/${item.codes}`"
    class="cards h-[310px] box-border rounded-md w-full overflow-hidden transition-all duration-500 shadow-sm hover:shadow-xl translate-y-0 translate-x-0 hover:translate-y-[-5px] hover:translate-x-[-5px] border border-gray-200 border-solid"
    v-for="item in lists"
  >
    <div class="w-full h-full relative">
      <img
        :src="item.cover"
        class="mx-auto w-full h-full object-cover opacity-100 transition-all duration-300 cursor-pointer"
        alt=""
        srcset=""
      />
      <div class="absolute top-0 right-0 bg-white px-[10px] opacity-50 text-[13px] hover:text-[15px] hover:opacity-100 transition-all border">
        {{ item.codes }}
      </div>
      <div
        class="absolute bottom-0 w-full left-0 h-[88px] py-[10px] bg-white transition-all duration-300 cursor-pointer pl-[20px]"
      >
        <div class="text-[14px] overflow-clip text-ellipsis leading-[25px]">
          {{ item.name_cn }}
        </div>
      </div>
    </div>
  </a>
</template>
<script setup>
import { onMounted, ref } from "vue";
const lists = ref([]);

const getLists = async () => {
  const url = `https://pedraapi.1414210199.workers.dev/list`;
  // const url = `http://localhost:8787/list`;
  const options = {
    method: "GET",
  };
  const res = await fetch(url, options);
  const { code, data } = await res.json();
  if (code == 0) {
    lists.value = data.list;
  }
};

onMounted(async () => {
  console.log("!111");
  getLists();
});
</script>
