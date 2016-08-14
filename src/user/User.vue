<template>
<article className="m-login-no">
    <div className="content clearfix">
        <div className="g-layout">
            <div className="form-login">
                <div className="g-tac g-mb20">
                    <img src={logo} />
                    <h3>欢迎来到121店</h3>
                </div>
                <Form horizontal form={this.props.form}>
                    <FormItem
                        {...formItemLayout}
                        label=""
                        hasFeedback
                        help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}>
                        <Input size="large" {...nameProps} placeholder="手机号" />
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="">
                        <Input size="large" {...passwdProps} type="password" placeholder="密码" autoComplete="off"
                               onContextMenu={this.noop} onPaste={this.noop} onCopy={this.noop} onCut={this.noop} />
                    </FormItem>

                    <FormItem {...formItemLayout}>
                        <Button type="primary" size="large" className="g-full" @click="">确定</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
</article>
</template>

<script>
import { api } from '../store/Funs.js';
export default {
    name: 'App',

    components : {},

    data() {
        return {
            name: ''
            password: ''
        }
    },

    methods: {
        submit () {
            let params = {
                'mobile': this.name,
                'password': this.password
            }

            api.
        }

    },

    // router: {
    //     data(transition) {
    //         window.setTimeout(() => {
    //             transient.next()
    //         }, 3000)
    //     }
    // }
}

</script>

<style lang="less">
/**************************** 登录表单 ****************************/
.m-login-no{
  background:url('../img/bg.jpg') center bottom;
  background-size: auto;
  .content{
    background:url('../img/bg-bottom.png') center bottom no-repeat;
    width:100%;
    position: relative;
    height: calc(~"100vh - 140px");
  }
}
.form-login{
  border:1px solid #ddd;
  max-width:400px;
  margin: 10% auto 0;
  background:#fff;
  padding:20px 20px 5px;
  border-radius: 5px;
  .ant-form-item{
    margin-bottom: 18px;
  }
  .ant-form-item-control{
    line-height:38px;
  }
  .ant-input-lg{
    height:38px;
    font-size:14px;
    background-color:#fafafa;
  }
  .ant-btn-lg{
    padding:8px 15px;
  }
}
</style>