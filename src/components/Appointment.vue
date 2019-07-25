<template>
  <div class="about">预约取件
    <!-- <h1>This is an about page</h1> -->
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="运单号" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="[
          '运单号',
          {rules: [{ required: true, message: '请输入运单号!' }]}
        ]"
        />
      </a-form-item>
      <a-form-item label="预约时间" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="[
          '预约时间',
          {rules: [{ required: true, message: '请输入预约时间!' }]}
        ]"
        />
      </a-form-item>
      
        <a-button type="primary" html-type="submit" style="margin-right:80px">预约</a-button>
        <a-button type="default" html-type="button">取消</a-button>
      
      
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this)
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.values
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    }
  }
};
</script>
