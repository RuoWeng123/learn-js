import * as R from 'ramda'

const tokenInfo = {
  isAdmin: true,
  userId: '11',
  roles: ['user']
}
const isAllowRead = function (permissions) {
  if (!permissions.length) {
    return {
      is_allow: false,
      inherit_parent: true
    }
  }

  let categoryList3 = permissions.filter(v => v.category === 3).map(v => v.name)
  let categoryList1_2 = permissions.filter(v => v.category !== 3).map(v => v.name)
  let categoryList1 = permissions.filter( v=> v.category === 1 && v.type === 1).map(v=> v.name)
  //categoryList3 为空，且permission.length > 0 说明其确定是可读的。但是需要判断一下，是不是针对该用户可读的。
  if (!categoryList3.length) {
    if (categoryList1_2.includes(tokenInfo.userId)) {
      //可读列表中有该用户
      return {
        is_allow: true,
        inherit_parent: false
      }
    } else if (R.intersection(tokenInfo.roles, categoryList1_2).length) {
      //可读列表中，有该角色,且不可读列表为空
      return {
        is_allow: true,
        inherit_parent: false
      }
    } else {
      // 用户，角色均不在可读列表中，故该节点的权限不是针对该用户或者角色的。返回不可读，采用继承父级的逻辑
      return {
        is_allow: false,
        inherit_parent: true
      }
    }

  }

  if (categoryList3.length) {
    if(categoryList1.includes(tokenInfo.userId)){
      return {
        is_allow: true,
        inherit_parent: false
      }
    }
    //设置了针对用户的不可读，必定不可读，角色不用判断了
    if (categoryList3.includes(tokenInfo.userId)) {
      return {
        is_allow: false,
        inherit_parent: false
      }
    } else {

      //TODO 2020/6/15  RUOWENG 不可读列表中没有该角色，也没有该用户，那么它是可读的嘛，也不一定，看看可读列表中是否有该角色和用户，否则，就要当作继承父级来处理
      // 不可读列表中没有包含当前用户，可读列表包含了当前用户，则可读的
      if (categoryList1_2.includes(tokenInfo.userId)) {
        return {
          is_allow: true,
          inherit_parent: false
        }
      } else {
        //可读列表不为空，不可读列表也不为空，此处需要判断是不是允许角色可读
        let intersection = R.intersection(tokenInfo.roles, categoryList1_2)
        if (intersection.length > 0) {
          return {
            is_allow: true,
            inherit_parent: false
          }
        } else {
          //可读列表中有数据，但是既不包含角色，也不包含用户。说明可读列表不是针对该用户的
          return {
            is_allow: false,
            inherit_parent: true
          }
        }
      }
      // 不可读列表中没有包含该用户，检查是否含有该角色，若是有该角色，必定不可读
      if (R.intersection(tokenInfo.roles, categoryList3).length) {
        return {
          is_allow: false,
          inherit_parent: false
        }
      }
    }
  }
}

const isArrowWrite = function (permissions) {
  if (!permissions.length) {
    return {
      is_allow: false,
      inherit_parent: true
    }
  }
  let categoryList1 = permissions.filter(v => v.category === 1).map(v => v.name)
  let categoryList2 = permissions.filter(v => v.category === 2).map(v => v.name)
  if (!categoryList1.length) {
    //可写列表为空，但是permissions不为空,此时肯定有不可写的列表
    if (categoryList2.includes(tokenInfo.userId)) {
      //不可写列表中有该用户
      return {
        is_allow: false,
        inherit_parent: false
      }
    } else if (R.intersection(tokenInfo.roles, categoryList2).length) {
      //不可写角色中有该用户
      return {
        is_allow: false,
        inherit_parent: false
      }
    } else {
      return {
        is_allow: false,
        inherit_parent: true
      }
    }
  } else {
    if (!categoryList2.length) {
      if (categoryList1.includes(tokenInfo.userId)) {
        //可写列表中有该用户
        return {
          is_allow: true,
          inherit_parent: false
        }
      } else if (R.intersection(tokenInfo.roles, categoryList1).length) {
        //可写列表中，有该角色,且可读列表中没有该用户
        return {
          is_allow: true,
          inherit_parent: false
        }
      } else {
        return {
          is_allow: false,
          inherit_parent: true
        }
      }
    } else {
      if (categoryList1.includes(tokenInfo.userId)) {
        //可写列表中有该用户
        return {
          is_allow: true,
          inherit_parent: false
        }
      } else if (R.intersection(tokenInfo.roles, categoryList1).length) {
        //可写列表中，有该角色,且可读列表中没有该用户
        return {
          is_allow: true,
          inherit_parent: false
        }
      } else if (categoryList2.includes(tokenInfo.userId)) {
        //不可写列表中有该用户
        return {
          is_allow: false,
          inherit_parent: false
        }
      } else if (R.intersection(tokenInfo.roles, categoryList2).length) {
        //不可写角色中有该用户
        return {
          is_allow: false,
          inherit_parent: false
        }
      } else {
        return {
          is_allow: false,
          inherit_parent: true
        }
      }
    }
  }
}

const flagTreeWrite = function (tree, target = { path: [] }) {
  for (let i in tree) {
    tree[i].writAble = isArrowWrite(tree[i].permissions).is_allow
    tree[i].write = isArrowWrite(tree[i].permissions)
    if (tree[i].children && tree[i].children.length) {
      flagTreeWrite(tree[i].children, tree[i])
    }
  }
  return tree
}



const flagTree = function (tree, target = { path: [] }) {
  for (let i in tree) {

    tree[i].children = tree[i].children ? tree[i].children : tree[i].layers ? tree[i].layers : []
    tree[i].path = [].concat(target.path, [{ id: tree[i].id, name: tree[i].name, acl: tree[i].acl, permissions: tree[i].permissions }])
    tree[i].readAble = isAllowRead(tree[i].permissions).is_allow
    tree[i].read = isAllowRead(tree[i].permissions)
    if (tree[i].children && tree[i].children.length) {
      flagTree(tree[i].children, tree[i])
    }
  }
  return tree
}

function filterTreeByField (arr, field = 'readAble') {
  return arr.filter(item => item[field]).map(item => {
    item = Object.assign({}, item)
    if (item.children) {
      item.children = filterTreeByField(item.children)
    }
    return item
  })
}

const treeToArray = function (tree, treeArray = []) {
  const forTree = function (tree) {
    tree.forEach(item => {
      treeArray.push(item)
      if (item.children && item.children.length) {
        forTree(item.children, treeArray)
      }
    })
  }
  forTree(tree)
  return treeArray
}

const checkCurrentNextReadAble = function (current, next) {
  //子允许，父不允许
  if (isAllowRead(current.permissions).is_allow && !isAllowRead(next.permissions).is_allow) {
    // 父需要依托子 修改父，子不修改
    return true
  }
}

//正向树继承，非子元素导致的父元素可读，且子元素permissions为[], 子元素可读
const updateArrayReadableByAsc = function (treeArray) {
  treeArray.forEach((item, index) => {
    let parent = item.type === 'layer_category' ? R.find(R.propEq('id', item.pid), treeArray) : R.find(R.propEq('id', item.layer_category.id), treeArray)
    if (parent) {
      if (!item.read.is_allow && item.read.inherit_parent && parent.allow_inhertable !== false) {
        item.readAble = parent.readAble
        item.allow_inhertable = true
      }
    }
  })
  return treeArray
}
//倒置修改树，子允许，父应该也要允许读
const updateArrayReadableByDesc = function (treeArray) {
  let permissionsList = treeArray.filter(v => v.permissions.length && v.readAble).map(v => {
    v.path = v.path.reverse()
    return v
  })

  permissionsList.forEach((item, index) => {
    const path_length = item.path.length
    for (let i = 0; i < path_length - 1; i++) {
      if (checkCurrentNextReadAble(item.path[i], item.path[i + 1])) {
        let target = R.find(R.propEq('id', item.path[i + 1].id), treeArray)
        target.readAble = true
        target.allow_inhertable = false
      }
    }
  })
  return treeArray
}
const ArrayToTree = function (data) {

}

export {
  isAllowRead,
  isArrowWrite,
  flagTree,
  flagTreeWrite,
  treeToArray,
  updateArrayReadableByDesc,
  updateArrayReadableByAsc,
  filterTreeByField
}
