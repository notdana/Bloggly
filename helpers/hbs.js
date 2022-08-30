const moment = require('moment')

module.exports = {
    formatDate: function(date,format){
        return moment(date).format(format)
    },
    truncate: function(str,len){
        if(str.length > len && str.length > 0) {
            let newStr = str + ' '
            newStr = str.substr(0,len)
            newStr = str.substr(0,newStr.lastIndexOf(' '))
            newStr = newStr.length > 0 ? newStr: str.substr(0,len)
            return newStr + '...'
        }
        return str
    },
    stripTags: function (input) {
        return input.replace(/<(?:.|\n)*?>/gm, '')
    },
    editIcon: function(blogUser,loggedUser, blogId, floating = true){
        if(blogUser._id.toString()==loggedUser._id.toString()){
            if(floating){
                return `<a href="/blogs/edit/${blogId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
            } else {
                return `<a href="/blogs/edit/${blogId}"><i class="fas fa-edit"></i></a>`
            } 
        } else {
            return ''
        }
    },
    select: function(selected, options){
        return options.fn(this).replace(
            new RegExp(' value="' + selected + '"'), '$& selected="selected"'
        ).replace(
            new RegExp('>' + selected + '</option>'), ' selected="selected"$&'
        )
    },
}