function onSave(f) {
	if(f.name.value.trim() == "") {
		alert('제목은 필수정보 입니다.');
		f.name.focus();
		return false;
	}
	return true;
}

function onRemove(id) {
	if(confirm('삭제하시겠습니까?')) {
		location.href = '/book/remove/'+id;
	}
}