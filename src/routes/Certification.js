import React from 'react';
import {connect} from 'dva';
import {createForm} from 'rc-form';
import {NavBar, Icon, Button, InputItem, List, Toast, ImagePicker} from 'antd-mobile';
import styles from './Certification.less';


function Certification(props, context) {
  const {type, id} = props.params;
  const {getFieldProps, validateFields, getFieldError,getFieldsValue} = props.form;
  const {files,currentData} = props.certification;
  const data = {...currentData};
  return (
    <div className={styles.normal}>
      <NavBar
        mode="dark"
        onLeftClick={() => {
          props.history.goBack()
        }}
      >实名认证</NavBar>
      <div className="flex-row ai-center fs-28 ph-30"
           style={{height: '.72rem', backgroundColor: '#fff8e9', color: '#ffb540'}}>
        <div className="flex-row ai-center">
          <img src={require('../assets/warning.png')} className="wh-30" style={{marginRight: '.18rem'}}/>
          <div style={{position: 'absolute', fontSize: '.2rem', color: '#fff', marginLeft: '0.12rem'}}>i</div>
        </div>
        <div>您上传的身份证件信息将被严格保密。</div>
      </div>
      <List>
        <InputItem
          {...getFieldProps('name', {
            initialValue: data.name,
            rules: [{required: true, message: '姓名不能为空'}]
          })}
          placeholder="请输入真实姓名"
        >真实姓名</InputItem>
        <InputItem
          {...getFieldProps('id_num', {
            initialValue: data.id_num,
            rules: [{required: true, message: '身份证号不能为空'}]
          })}
          type="number"
          placeholder="请输入身份证号"
        >身份证号</InputItem>
        <InputItem
          style={{display: 'none'}}
        />
      </List>

      <div className="flex-col bg-color-f" onClick={
        () => {
        }}>
        <div className="ph-30 fs-30 color-3" style={{marginBottom: '.52rem'}}>
          <div className="mt-30">身份证照片</div>
          <div className="mt-30 fs-24 color-9">请手持身份证正面拍照上传，并确认人脸和证件信息清晰可辩。</div>
          <div style={{lineHeight: '.4rem', color: '#ee873a', fontSize: '.24rem'}}>( 1.头部与身份证无重叠 2.本人头像清晰 3.身份证信息 4.
            图片不能超过2M )
          </div>
        </div>
        {
          files.length == 0 ? <div id={styles['id_box']} className="flex-col flex-jc-center ai-center">
            <img src={require('../assets/id_photo.jpg')}
                 style={{width: '2.9rem', height: '2.9rem', alignSelf: 'center'}}/>
          </div> : ''
        }

        <ImagePicker
          className={'my-ip-' + (4 - (files.length % 4 + (files.length == 2?0:1)))}
          files={files}
          onChange={(files, type, index) => {
            if (type == 'add') {
              props.dispatch({
                type: 'certification/uploadImg',
                files: files,
                begin: () => {
                  Toast.loading("上传中", 0, () => {
                  }, true);
                },
                end: () => {
                  Toast.hide();
                }
              })
            } else {
              props.dispatch({
                type: 'certification/filesChange',
                files: files
              })
            }

          }}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 2}
        />
      </div>
      {/*
       <div className="flex-col bg-color-f" onClick={
       () => {
       }}>
       <div className="ph-30 fs-30 color-3">
       <div className="mt-30">身份证照片</div>
       <div className="mt-30 fs-24 color-9">请手持身份证正面拍照上传，并确认人脸和证件信息清晰可辩。</div>
       <div style={{lineHeight:'.4rem',color:'#ee873a',fontSize:'.24rem'}}>( 1.头部与身份证无重叠   2.本人头像清晰   3.身份证信息   4.
       图片不能超过2M )</div>
       </div>
       <div id={styles['id_box']} className="flex-col flex-jc-center ai-center">
       <img src={require('../assets/id_photo.jpg')} style={{width: '2.9rem', height: '2.9rem',alignSelf:'center'}}/>
       </div>
       <img src={require('../assets/upload_bg.png')} style={{width: '4.84rem', height: '3rem', margin: '.3rem 0',alignSelf:'center'}}/>
       </div>
       */}
      <div className="fixed-lb width-full">
        <Button className="zrcf-btn" type="primary" onClick={() => {
          validateFields((errors, values) => {
            if (errors) {
              for (let f in errors) {
                let errs = getFieldError(f);
                let errsMsg = errs[0];
                Toast.info(errsMsg, 2);
                return;
              }
            }
            props.dispatch({
              type: 'certification/add',
              param: values,
              begin:()=>{
                Toast.loading("提交中", 0, () => {
                }, true);
              },
              success:()=>{
                Toast.hide();
                props.history.goBack();
              },
              fail:(msg)=>{
                Toast.hide();
                Toast.info(msg, 2);
              }
            });

          })
        }}>
          提交审核
        </Button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}
Certification.contextTypes = {
  router: React.PropTypes.object.isRequired
};
const CertificationWrapper = createForm()(Certification);
export default connect(mapStateToProps)(CertificationWrapper);
