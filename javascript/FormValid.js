function checkRule(obj, key, rule) {
  return rule.valid ? rule.valid(obj[key]) : true
}

function validator(obj, rules) {
  for (let key in rules) {
    const rule = rules[key]
    // 如果为空
    if (obj[key] !== undefined && obj[key].length === 0) {
      return rule.empty || '请输入'
    }
    // 验证规则有效性
    if (!checkRule(obj, key, rule)) {
      return rule.error || '请输入正确的值'
    }
  }
}

const rules = {
  phone: {
    valid: value => /\d{11}/.test(value),
    empty: '请输入手机号',
    error: '请输入正确的手机号'
  },
  code: {
    valid: value => value.length === 4,
    empty: '请输入验证码',
    error: '请输入正确的验证码'
  }
}

const obj = { phone: '', code: '' }
console.log('test1:', validator(obj, rules))

obj.phone = '12323'
console.log('test2:', validator(obj, rules))

obj.phone = '13000000000'
console.log('test3:', validator(obj, rules))

obj.code = 'xz'
console.log('test4:', validator(obj, rules))

obj.code = 'xz22'
console.log('test5:', validator(obj, rules))
