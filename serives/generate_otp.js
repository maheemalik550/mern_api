const generate_otp = ()=>{
    const otp = Math.round(1000 + Math.random() * 9000)
    return otp
}

module.exports = generate_otp