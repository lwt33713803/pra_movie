<template>
     <div class="bg-white shadow-sm p-[10px] rounded-md border border-color-black border-solid" v-for="item in 10">
        <span class="noto-sans-sc-400 text-[16px]">A</span>
        <div class="grid grid-cols-8 gap-[5px]">
            <div class="box-border cursor-pointer bg-gray-200 text-[14px] hover:text-[15px] transition-all duration-300" v-for="item in 16">
                <div class="flex items-center justify-center rounded-sm text-center h-[30px]">
                    <span class="noto-sans-sc-200">ABCD-110</span>
                </div>
            </div>
        </div>
    </div>
</template>