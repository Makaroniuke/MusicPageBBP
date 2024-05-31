$(document).ready(function() {
    $('textarea#summernote').summernote({
        placeholder: 'Type something:',
        tabsize: 2,
        height: 300,
  toolbar: [

        ['image', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']],
        ['float', ['floatLeft', 'floatRight', 'floatNone']],
        ['remove', ['removeMedia']]
    ,
        ['style', ['style']],
        ['font', ['bold', 'italic', 'underline', 'clear']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['height', ['height']],
        ['table', ['table']],
        ['insert', ['link', 'picture', 'hr']],
        ['view', ['fullscreen', 'codeview']],
        ['help', ['help']]
      ],
      });
  });

$('textarea#summernote').summernote('insertImage', url);


$(document).ready(function() {
    // Initialize Summernote
    $('#summernote').summernote();

    // Client-side validation on form submit
    $('#myForm').submit(function(event) {
      var content = $('#summernote').summernote('code');

      // Check for forbidden words
      if (containsForbiddenWords(content)) {
        alert('Scripts are not allowed!');
        event.preventDefault(); // Prevent form submission
      }
    });

    function containsForbiddenWords(content) {
      var forbiddenWords = ['script']; // Add your forbidden words here
      var lowerContent = content.toLowerCase();

      return forbiddenWords.some(function(word) {
        return lowerContent.includes(word);
      });
    }
});