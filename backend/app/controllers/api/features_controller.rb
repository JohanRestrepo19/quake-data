module Api
  class FeaturesController < JSONAPI::ResourceController
    def create_comment
      # @type [Feature]
      feature = Feature.find(params[:feature_id])

      # @type [Comment]
      comment = feature.comments.new(body: comment_params)

      if comment.save
        render json: JSONAPI::ResourceSerializer
          .new(CommentResource)
          .object_hash(CommentResource.new(comment, {}), {})

      else
        render json: comment.errors, status: :unprocessable_entity
      end
    end

    private

    def comment_params
      params.require(:body)
    end
  end
end
