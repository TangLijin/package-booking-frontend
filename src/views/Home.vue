<template>
  <div class="home">
    <a-button class="editable-add-btn" @click="showModal">Add</a-button>
    <collection-create-form
      ref="collectionForm"
      :visible="visible"
      @cancel="handleCancel"
      @create="handleCreate"
    />
    <a-modal
      :visible="visible"
      title="添加新运单"
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
        <a-form-item label="状态">
          <a-input
            v-decorator="[
              '状态',
              {
                rules: [{ required: true, message: '请输入运单状态!' }],
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="Description">
          <a-input type="textarea" v-decorator="['description']" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-table bordered :dataSource="dataSource" :columns="columns">
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm v-if="dataSource.length" title="确认收货?" @confirm="() => onReceive(record.key)">
          <a href="javascript:;">确认收货</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script>
const CollectionCreateForm = {
  props: ["visible"],
  beforeCreate() {
    this.form = this.$form.createForm(this);
  }
};
export default {
  name: "home",
  components: { CollectionCreateForm },
  data: function() {
    return {
      visible: false,
      dataSource: [
        {
          key: "0",
          运单号: "123456",
          收件人: "Edward King 0",
          电话: "32",
          状态: "London, Park Lane no. 0",
          预约时间: 2019
          // }, {
          //   key: '1',
          //   name: 'Edward King 1',
          //   age: '32',
          //   address: 'London, Park Lane no. 1',
        }
      ],
      count: 1,
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
      ]
    };
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
      const form = this.$refs.collectionForm.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log("Received values of form: ", values);
        form.resetFields();
        this.visible = false;
      });
    }
    // handleAdd () {
    //   const { count, dataSource } = this
    //   const newData = {
    //     key: count,
    //     name: `Edward King ${count}`,
    //     age: 32,
    //     address: `London, Park Lane no. ${count}`,
    //   }
    //   this.dataSource = [...dataSource, newData]
    //   this.count = count + 1
    // },
  }
};
</script>
