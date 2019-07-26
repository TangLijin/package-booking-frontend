<template>
  <div class="CargoPackage">

    <a-button class="editable-add-btn" @click="showModal">Add</a-button>
    <a-modal
      :visible="visible"
      title="包裹入库"
      okText="Create"
      @cancel="handleCancel"
      @ok="handleCreate"
    >
      <a-form layout="vertical" :form="form">
        <a-form-item label="运单号">
          <a-input
            v-decorator="[
              '运单号',
              {
                rules: [{ required: true, message: '请输入运单号!' }],
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="收件人">
          <a-input
            v-decorator="[
              '收件人',
              {
                rules: [{ required: true, message: '请输入收件人姓名!' }],
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="电话">
          <a-input
            v-decorator="[
              '电话',
              {
                rules: [{ required: true, message: '请输入收件人电话!' }],
              }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-table bordered :dataSource="dataSource" :columns="columns">
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm v-if="dataSource.length" title="确认收货?" @confirm="() => onReceive(record.key)">
          <!-- <a-popconfirm v-if="dataSource.length" title="确认收货?" @confirm="() => onReceive(record.key)"> -->
          <a href="javascript:;">确认收货</a>
        </a-popconfirm>
      </template>
    </a-table>
    </div>
  
</template>

<script>
import { constants } from "crypto";

let id = 0;
const getId = () => {
  return id++;
};
export default {
  name: "CargoPackage",
  data: function() {
    return {
      visible: false,
      dataSource: [
        // {
        //   key: "0",
        //   // key:"" + this.getId(),
        //   运单号: "158",
        //   收件人: "Louis",
        //   电话: "520",
        //   状态: "已取件",
        //   预约时间: "2019"
        // }
      ],
      count: 0,
      columns: [
        {
          title: "运单号",
          dataIndex: "运单号",
          width: "20%",
          scopedSlots: { customRender: "运单号" }
        },
        {
          title: "收件人",
          dataIndex: "收件人"
        },
        {
          title: "电话",
          dataIndex: "电话"
        },
        {
          title: "状态",
          dataIndex: "状态"
        },
        {
          title: "预约时间",
          dataIndex: "预约时间"
        },
        {
          title: " ",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        }
      ],
      form: this.$form.createForm(this)
    };
  },
  mounted(){
    // console.log("123      ",this.dataSource);
    this.dataSource = this.$store.getters.getAllPackage;
  },

  methods: {
    
    onReceive(key) {
      // const dataSource = [...this.dataSource]
      // this.dataSource = dataSource.filter(item => item.key !== key)
    },
   
 
    showModal() {
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
    handleCreate() {
      const form = this.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        form.resetFields();
        this.visible = false;
        const { count, dataSource } = this;
        let newData = {
          key: count,
          运单号: values.运单号,
          收件人: values.收件人,
          电话: values.电话, 
          预约时间: null,
          状态: this.预约时间 == null ? "未取件" : "已预约",
        };
        // console.log("----",this.$store.state.packageList);
        this.$store.commit('addPackage',newData);
        // console.log(this.$store.getters.getAllPackage)
        // this.dataSource = [...dataSource, newData];
        this.count = count + 1;
      });
    }
  },
  
};
</script>
