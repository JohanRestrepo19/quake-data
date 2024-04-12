module Api
  class CommentResource < JSONAPI::Resource
    has_one :feature

    attributes :body
  end
end
