package com.ssafy.ploud.domain.record;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFeedbackEntity is a Querydsl query type for FeedbackEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFeedbackEntity extends EntityPathBase<FeedbackEntity> {

    private static final long serialVersionUID = -1887851634L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFeedbackEntity feedbackEntity = new QFeedbackEntity("feedbackEntity");

    public final StringPath content = createString("content");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final com.ssafy.ploud.domain.speech.QSpeechEntity speech;

    public final TimePath<java.sql.Time> timeLog = createTime("timeLog", java.sql.Time.class);

    public final com.ssafy.ploud.domain.user.QUserEntity user;

    public QFeedbackEntity(String variable) {
        this(FeedbackEntity.class, forVariable(variable), INITS);
    }

    public QFeedbackEntity(Path<? extends FeedbackEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFeedbackEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFeedbackEntity(PathMetadata metadata, PathInits inits) {
        this(FeedbackEntity.class, metadata, inits);
    }

    public QFeedbackEntity(Class<? extends FeedbackEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.speech = inits.isInitialized("speech") ? new com.ssafy.ploud.domain.speech.QSpeechEntity(forProperty("speech"), inits.get("speech")) : null;
        this.user = inits.isInitialized("user") ? new com.ssafy.ploud.domain.user.QUserEntity(forProperty("user")) : null;
    }

}

