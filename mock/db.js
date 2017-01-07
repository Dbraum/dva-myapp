var faker = require("faker");
var _ = require("lodash");

module.exports = function () {

  return {
    people: generateUsers(),
    admin:[{username:'guest',password:'guest'}]
  }
}


function generateUsers(){
  return _.times(100, function (n) {
        return {
          id: n,
          name: faker
            .name
            .findName(),
          nickName: faker
            .name
            .lastName(),
          phone: faker
            .phone
            .phoneNumber(),
          address: `${faker
            .address
            .country()} ${faker
            .address
            .state()} ${faker
            .address
            .city()}`,
          isMale: faker
            .random
            .boolean(),
          email: faker
            .internet
            .email(),
          createTime: faker
            .date
            .past(),
          age: faker
            .random
            .number(100),
          avatar: faker
            .internet
            .avatar()
        }
      })
}
