package com.ssafy.ploud.domain.speech;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSpeechEntity is a Querydsl query type for SpeechEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSpeechEntity extends EntityPathBase<SpeechEntity> {

    private static final long serialVersionUID = -190586950L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSpeechEntity speechEntity = new QSpeechEntity("speechEntity");

    public final EnumPath<SpeechCategory> category = createEnum("category", SpeechCategory.class);

    public final StringPath comment = createString("comment");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final BooleanPath personal = createBoolean("personal");

    public final DateTimePath<java.time.LocalDateTime> recordTime = createDateTime("recordTime", java.time.LocalDateTime.class);

    public final com.ssafy.ploud.domain.record.QScoreEntity score;

    public final com.ssafy.ploud.domain.script.QScriptEntity script;

    public final com.ssafy.ploud.domain.record.QVideoEntity speechVideo;

    public final com.ssafy.ploud.domain.user.QUserEntity user;

    public QSpeechEntity(String variable) {
        this(SpeechEntity.class, forVariable(variable), INITS);
    }

    public QSpeechEntity(Path<? extends SpeechEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSpeechEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSpeechEntity(PathMetadata metadata, PathInits inits) {
        this(SpeechEntity.class, metadata, inits);
    }

    public QSpeechEntity(Class<? extends SpeechEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.score = inits.isInitialized("score") ? new com.ssafy.ploud.domain.record.QScoreEntity(forProperty("score")) : null;
        this.script = inits.isInitialized("script") ? new com.ssafy.ploud.domain.script.QScriptEntity(forProperty("script")) : null;
        this.speechVideo = inits.isInitialized("speechVideo") ? new com.ssafy.ploud.domain.record.QVideoEntity(forProperty("speechVideo")) : null;
        this.user = inits.isInitialized("user") ? new com.ssafy.ploud.domain.user.QUserEntity(forProperty("user")) : null;
    }

}

