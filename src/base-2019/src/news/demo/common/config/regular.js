export default {
	phoneNumReg: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/, // 手机号
	phoneNumMsg: '请输入正确的手机号', // 手机号

	loginPassWordReg: /^(?![A-Za-z]+$)(?!\d+$)(?![\W_]+$)\S{6,16}$/, //  登陆密码 只能包含字母，数字及标点号（需要两两组合），区分大小写 6-16
	loginPassWordMsg: '密码需包含字母，数字及标点号（需要两两组合），区分大小写 6-16位',

	realNameReg: /^[\u2E80-\u9FFF]{2,6}$/, // 手机号
	realNameMsg: '2-6中文汉字', // 手机号

	publicAccountNumberReg: /^[0-9]{1,20}$/, //对公账号
	socialCreditReg: /^[A-Za-z0-9]{1,20}$/, // 社会信用代码
	identityCardReg: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/, //身份证号验证
	businessLicenseReg: /^[0-9]{1,20}$/, // 营业执照
	taxRegistrationReg: /^[A-Za-z0-9-]{1,20}$/, // 税务登记号
	organizationReg: /^[A-Za-z0-9-]{1,20}$/, //组织机构代码
	bankCardNumberReg: /^[0-9]{1,20}$/ //银行卡号
}